// VIGIA DE PREÇOS do Nexus — roda no GitHub Actions de hora em hora, com o celular e o PC desligados.
// Lê vigias.json, consulta os preços, grava vigias-estado.json e avisa no celular (ntfy) com o botão "Comprar".
// Passagens: API de dados da Aviasales/Travelpayouts (segredo TP_TOKEN). Produtos: preço da própria página da loja.
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
const TP = process.env.TP_TOKEN || '', TOPICO = process.env.NTFY_TOPIC || ''
const ler = (f, d) => { try { return JSON.parse(readFileSync(f, 'utf8')) } catch { return d } }
const vigias = ler('vigias.json', []), estado = ler('vigias-estado.json', {}), agora = new Date().toISOString()
const brl = (v) => 'R$ ' + Number(v).toLocaleString('pt-BR', { maximumFractionDigits: 0 })
async function avisar(titulo, msg, link) {
  if (!TOPICO) return console.log('sem NTFY_TOPIC:', titulo, msg)
  const h = { Title: '=?UTF-8?B?' + Buffer.from(titulo).toString('base64') + '?=', Tags: 'airplane,moneybag', Priority: 'high' }
  if (link) { h.Click = link; h.Actions = `view, Comprar, ${link}; view, Abrir Nexus, https://pedrosantosesilva13-prog.github.io/nexus/#vigias` }
  await fetch('https://ntfy.sh/' + TOPICO, { method: 'POST', headers: h, body: msg }).catch((e) => console.log('ntfy', e.message))
}
async function voo(v) {
  if (!TP) throw new Error('falta o segredo TP_TOKEN')
  const q = new URLSearchParams({ origin: v.origem, destination: v.destino, departure_at: v.ida, currency: 'brl', sorting: 'price', direct: v.direto ? 'true' : 'false', limit: '10', page: '1', one_way: v.volta ? 'false' : 'true', token: TP })
  if (v.volta) q.set('return_at', v.volta)
  const r = await fetch('https://api.travelpayouts.com/aviasales/v3/prices_for_dates?' + q, { headers: { Accept: 'application/json' } })
  if (!r.ok) throw new Error('API de passagens ' + r.status)
  const d = ((await r.json()).data || []).sort((a, b) => a.price - b.price)[0]
  if (!d) return null
  return { preco: d.price, desc: `${v.origemNome || v.origem} → ${v.destinoNome || v.destino} · ${String(d.departure_at).slice(0, 10).split('-').reverse().join('/')}${d.return_at ? ' (volta ' + String(d.return_at).slice(0, 10).split('-').reverse().join('/') + ')' : ''} · ${d.airline}${d.transfers ? ' · ' + d.transfers + ' escala(s)' : ' · direto'}`, link: 'https://www.aviasales.com' + (d.link || '') + (String(d.link || '').includes('?') ? '&' : '?') + 'currency=brl&locale=pt' }
}
async function produto(v) {
  const r = await fetch(v.url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128 Safari/537.36', 'Accept-Language': 'pt-BR,pt;q=0.9' }, redirect: 'follow' })
  if (!r.ok) throw new Error('a loja respondeu ' + r.status)
  const html = await r.text(); let preco = null, nome = ''
  for (const m of html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)) {
    try { const arr = [].concat(JSON.parse(m[1].trim())); for (const o of arr.flatMap((x) => [x, ...(x['@graph'] || [])])) { const of = [].concat(o.offers || []).flatMap((x) => [x, ...[].concat(x.offers || [])])[0]; const p = of && (of.price ?? of.lowPrice); if (p) { preco = Number(String(p).replace(',', '.')); nome = o.name || nome; break } } } catch {}
    if (preco) break
  }
  if (!preco) { const m = html.match(/(?:product:price:amount|itemprop="price")[^>]*content="([\d.,]+)"/i) || html.match(/"price"\s*:\s*"?([\d.]+)"?/); if (m) preco = Number(m[1].replace(/\.(?=\d{3}\b)/g, '').replace(',', '.')) }
  if (!preco) throw new Error('não achei o preço nessa página')
  return { preco, desc: nome || v.nome || v.url, link: v.url }
}
let mudou = false
for (const v of vigias) {
  if (!v || !v.id || v.pausado) continue
  const e = estado[v.id] || {}
  try {
    const r = v.tipo === 'produto' ? await produto(v) : await voo(v)
    e.verificado = agora; e.erro = ''
    if (!r) { e.ultimo = null; estado[v.id] = e; mudou = true; continue }
    const caiu = e.ultimo && r.preco < e.ultimo.preco, alvo = v.alvo && r.preco <= v.alvo
    if (!e.melhor || r.preco < e.melhor.preco) e.melhor = { ...r, quando: agora }
    // avisa quando bate o preço que o senhor quer, ou quando cai mais de 5% (no máximo 1 aviso por preço)
    if ((alvo || (caiu && r.preco <= e.ultimo.preco * 0.95)) && e.avisado !== r.preco) {
      await avisar(alvo ? `Achei! ${brl(r.preco)}` : `Caiu para ${brl(r.preco)}`, `${r.desc}\n${v.alvo ? 'Seu alvo: ' + brl(v.alvo) + '. ' : ''}Quer comprar? Toque em Comprar: você confere e paga no site.`, r.link)
      e.avisado = r.preco
    }
    e.ultimo = { ...r, quando: agora }; e.historico = [...(e.historico || []), { p: r.preco, t: agora.slice(0, 13) }].slice(-72)
  } catch (err) { e.erro = String(err.message || err).slice(0, 160); e.verificado = agora; console.log(v.id, e.erro) }
  estado[v.id] = e; mudou = true
}
for (const k of Object.keys(estado)) if (!vigias.some((v) => v.id === k)) { delete estado[k]; mudou = true }
if (mudou || !existsSync('vigias-estado.json')) writeFileSync('vigias-estado.json', JSON.stringify(estado, null, 1))
console.log('vigias:', vigias.length)
