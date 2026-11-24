import { useEffect, useState } from 'react';
import './styles.css';

import { NavLink, Route, Routes, useLocation } from 'react-router-dom';

import {
  LayoutDashboard,
  Package,
  Users,
  FileText,
  ShoppingCart,
  Warehouse,
  Settings,
  ChartNoAxesCombined,
  Receipt,
  Menu,
  Search,
  Plus,
  Printer,
  Save,
  Trash2,
  Pencil,
  ChevronDown,
  Boxes,
  ClipboardList,
  CircleDollarSign,
} from 'lucide-react';

import { initialProducts, initialClients, initialQuotes } from './data';

const money = (n) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(n || 0));

const read = (key, fallback) => {

  try {

    return JSON.parse(localStorage.getItem(key)) ?? fallback;

  } catch {

    return fallback;

  }

};

function useStored(key, fallback) {

  const [value, setValue] = useState(() => read(key, fallback));

  useEffect(() => localStorage.setItem(key, JSON.stringify(value)), [key, value]);

  return [value, setValue];

}

const navGroups = [

  {

    title: 'GERENCIAMENTO', items: [

      ['Produtos', '/produtos', Package],

      ['Estoque', '/estoque', Warehouse],

      ['Clientes', '/clientes', Users],

      ['Orçamento', '/orcamentos', FileText],

      ['Venda', '/vendas', ShoppingCart]

    ]

  },

  {

    title: 'ADMINISTRAÇÃO', items: [

      ['Configuração', '/configuracao', Settings],

      ['Relatórios', '/relatorios/vendas', ChartNoAxesCombined],

      ['Despesas', '/despesas', Receipt]

    ]

  }

];

function Shell({ children }) {

  const [open, setOpen] = useState(false);

  const location = useLocation();

  const page = [
    ...navGroups.flatMap(group => group.items),
    ['Dashboard', '/', LayoutDashboard],
  ].find(item => item[1] === location.pathname)?.[0] || 'MR - Material de Construção';

  return (

    <div className="app-shell">

      <aside className={`sidebar ${open ? 'show' : ''}`}>

        <div className="brand">

          <div className="brand-mark">MR</div>

          <div>

            <strong>MR MATERIAL</strong>

            <small>DE CONSTRUÇÃO</small>

          </div>

        </div>

        <div className="brand-caption">Um jeito fácil de construir barato</div>

        <NavLink to="/" end className="nav-link">

          <LayoutDashboard size={18} /> Dashboard

        </NavLink>

        {navGroups.map(group => (

          <section className="nav-group" key={group.title}>

            <p>{group.title}</p>

            {group.items.map(([label, path, Icon]) => (

              <NavLink key={path} to={path} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>

                <Icon size={18} />{label}

              </NavLink>

            ))}

          </section>

        ))}

        <div className="sidebar-bottom">

          <span className="avatar">MR</span>

          <div>

            <b>Administrador</b>

            <small>Gestão da loja</small>

          </div>

          <ChevronDown size={16} />

        </div>

      </aside>

      <main className="main">

        <header className="topbar">

          <button className="icon-button mobile-menu" onClick={() => setOpen(!open)}>

            <Menu />

          </button>

          <div>

            <span className="eyebrow">PAINEL DE CONTROLE</span>

            <h1>{page}</h1>

          </div>

          <div className="top-actions">

            <span className="today">{new Date().toLocaleDateString('pt-BR')}</span>

            <span className="avatar blue">AD</span>

          </div>

        </header>

        <div className="content">{children}</div>

        <footer>

          © {new Date().getFullYear()} MR Material de Construção <span>Gestão simples para sua loja.</span>

        </footer>

      </main>

    </div>

  );

}

function PageTitle({ title, subtitle, action }) {

  return (

    <div className="page-heading">

      <div>

        <h2>{title}</h2>

        {subtitle && <p>{subtitle}</p>}

      </div>

      {action}

    </div>

  );

}

function Button({ children, variant = 'primary', ...props }) {

  return (

    <button className={`btn ${variant}`} {...props}>

      {children}

    </button>

  );

}

function Stat({ label, value, hint, icon: Icon, tone }) {

  return (

    <div className="stat-card">

      <div className={`stat-icon ${tone}`}>

        <Icon size={21} />

      </div>

      <div>

        <span>{label}</span>

        <strong>{value}</strong>

        <small>{hint}</small>

      </div>

    </div>

  );

}

function Dashboard({ products, clients, quotes }) {

  const total = quotes.reduce((s, q) => s + Number(q.total), 0);

  return (

    <>

      <div className="welcome">

        <div>

          <span className="eyebrow light">VISÃO GERAL</span>

          <h2>Bem-vindo ao MR Material de Construção</h2>

          <p>Organize sua loja, acompanhe seus produtos e simplifique suas vendas.</p>

        </div>

        <div className="welcome-icon">

          <Boxes size={54} />

        </div>

      </div>

      <div className="stats-grid">

        <Stat label="Produtos cadastrados" value={products.length} hint="Itens no catálogo" icon={Package} tone="purple" />

        <Stat label="Clientes" value={clients.length} hint="Clientes registrados" icon={Users} tone="green" />

        <Stat label="Orçamentos" value={quotes.length} hint="Orçamentos salvos" icon={ClipboardList} tone="orange" />

        <Stat label="Total em orçamentos" value={money(total)} hint="Soma dos registros" icon={CircleDollarSign} tone="blue" />

      </div>

      <div className="two-col">

        <section className="panel">

          <div className="panel-head">

            <div>

              <h3>Estoque em atenção</h3>

              <p>Produtos com quantidade igual ou abaixo do mínimo</p>

            </div>

            <a href="/estoque">Ver estoque</a>

          </div>

          <ProductTable products={products.filter(p => Number(p.stock) <= Number(p.min))} />

        </section>

        <section className="panel">

          <div className="panel-head">

            <div>

              <h3>Acesso rápido</h3>

              <p>Atalhos para as tarefas mais usadas</p>

            </div>

          </div>

          <div className="quick-grid">

            <a href="/clientes"><Users />Cadastrar cliente</a>

            <a href="/produtos"><Package />Novo produto</a>

            <a href="/orcamentos"><FileText />Criar orçamento</a>

            <a href="/vendas"><ShoppingCart />Registrar venda</a>

          </div>

        </section>

      </div>

    </>

  );

}

function ProductTable({ products, onEdit, onDelete }) {

  return (

    <div className="table-wrap">

      <table>

        <thead>

          <tr>

            <th>Código</th>

            <th>Produto</th>

            <th>Marca</th>

            <th>Estoque</th>

            <th>Mínimo</th>

            <th>Preço</th>

            <th>Status</th>

            {onEdit && <th>Ações</th>}

          </tr>

        </thead>

        <tbody>

          {products.length ? products.map(p => (

            <tr key={p.id}>

              <td className="code">{p.id}</td>

              <td><b>{p.name}</b></td>

              <td>{p.brand || '—'}</td>

              <td>{p.stock}</td>

              <td>{p.min}</td>

              <td>{money(p.price)}</td>

              <td>

                <span className={`pill ${Number(p.stock) <= Number(p.min) ? 'warning' : 'success'}`}>

                  {Number(p.stock) <= Number(p.min) ? 'BAIXO' : 'NORMAL'}

                </span>

              </td>

              {onEdit && (

                <td className="actions">

                  <button onClick={() => onEdit(p)} title="Editar"><Pencil size={16} /></button>

                  <button onClick={() => onDelete(p.id)} title="Excluir"><Trash2 size={16} /></button>

                </td>

              )}

            </tr>

          )) : (

            <tr>

              <td colSpan={onEdit ? 8 : 7} className="empty">Nenhum produto encontrado.</td>

            </tr>

          )}

        </tbody>

      </table>

    </div>

  );

}

function Products({ products, setProducts }) {
  const blank = {
    id: '', name: '', barcode: '', brand: '', family: '', supplier: '',
    cost: '', promo: false, price: '', cashDiscount: '', installmentPrice: '',
    profitRate: 50, min: 0, stock: 0, unit: 'Unidade', expiration: '', warranty: ''
  };
  const [form, setForm] = useState(blank);
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState(false);

  const update = (field, value) => setForm(current => ({ ...current, [field]: value }));
  const filtered = products.filter(p =>
    `${p.id} ${p.name} ${p.barcode || ''} ${p.brand || ''}`.toLowerCase().includes(query.toLowerCase())
  );

  const submit = (e) => {
    e.preventDefault();
    if (!form.id.trim() || !form.name.trim()) return alert('Informe o código e o nome do produto.');
    const normalized = {
      ...form,
      stock: Number(form.stock || 0),
      min: Number(form.min || 0),
      cost: Number(form.cost || 0),
      price: Number(form.price || 0),
      cashDiscount: Number(form.cashDiscount || 0),
      installmentPrice: Number(form.installmentPrice || 0),
      profitRate: Number(form.profitRate || 0),
    };
    setProducts(old => editing
      ? old.map(p => String(p.id) === String(form.id) ? normalized : p)
      : [...old, normalized]
    );
    setForm(blank);
    setEditing(false);
  };

  const edit = (product) => {
    setForm({ ...blank, ...product, promo: Boolean(product.promo) });
    setEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const del = (id) => {
    if (confirm('Excluir este produto?')) setProducts(old => old.filter(p => String(p.id) !== String(id)));
  };

  const resetForm = () => {
    setForm(blank);
    setEditing(false);
  };

  return (
    <>
      <PageTitle
        title="Produtos"
        subtitle="Cadastre, consulte e mantenha seu catálogo atualizado."
        action={<Button onClick={resetForm}><Plus size={17} /> Novo produto</Button>}
      />

      <section className="panel product-registration">
        <div className="panel-head">
          <div>
            <h3>{editing ? 'Editar produto' : 'CADASTRO DE PRODUTO'}</h3>
            <p>Preencha as informações comerciais e de estoque do produto.</p>
          </div>
        </div>

        <form className="product-form" onSubmit={submit}>
          <div className="product-form-grid">
            <Field label="Código de Barras">
              <input value={form.barcode} onChange={e => update('barcode', e.target.value)} placeholder="Informe o código de barras" />
            </Field>

            <Field label="Nome do produto" className="product-wide">
              <input value={form.name} onChange={e => update('name', e.target.value)} placeholder="Nome do produto" required />
            </Field>

            <Field label="Marca">
              <input value={form.brand} onChange={e => update('brand', e.target.value)} placeholder="Marca" />
            </Field>

            <Field label="Família">
              <select value={form.family} onChange={e => update('family', e.target.value)}>
                <option value="">Selecione a família</option>
                {[
                  'Elétrico',
                  'Hidráulico',
                  'Ferragens',
                  'Pintura',
                  'Construção',
                  'Acabamento',
                  'Ferramentas',
                  'Outros',
                ].map(item => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </Field>

            <Field label="Fornecedor">
              <input value={form.supplier} onChange={e => update('supplier', e.target.value)} placeholder="Nome do fornecedor" />
            </Field>

            <Field label="Custo R$">
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.cost}
                onChange={e => update('cost', e.target.value)}
                placeholder="0,00"
              />
            </Field>

            <div className="field promo-field">
              <span>Promocional?</span>
              <label className="checkbox-control">
                <input type="checkbox" checked={form.promo} onChange={e => update('promo', e.target.checked)} />
                <span>{form.promo ? 'Sim' : 'Não'}</span>
              </label>
            </div>

            <Field label="Preço - Venda">
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={e => update('price', e.target.value)}
                placeholder="0,00"
                required
              />
            </Field>

            <Field label="Desconto - à vista (%)">
              <input
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={form.cashDiscount}
                onChange={e => update('cashDiscount', e.target.value)}
                placeholder="0"
              />
            </Field>

            <Field label="Preço - Prazo">
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.installmentPrice}
                onChange={e => update('installmentPrice', e.target.value)}
                placeholder="0,00"
              />
            </Field>

            <div className="field profit-field">
              <div className="profit-heading">
                <span>Taxa de Lucro %</span>
                <strong>{form.profitRate}%</strong>
              </div>
              <input
                className="profit-range"
                type="range"
                min="0"
                max="100"
                value={form.profitRate}
                onChange={e => update('profitRate', Number(e.target.value))}
              />
              <div className="range-labels"><span></span><span></span><span></span></div>
            </div>

            <Field label="Código do produto">
              <input value={form.id} onChange={e => update('id', e.target.value)} placeholder="Ex.: 00085" disabled={editing} required />
            </Field>

            <Field label="Estoque mínimo">
              <input type="number" min="0" value={form.min} onChange={e => update('min', e.target.value)} placeholder="0" />
            </Field>

            <Field label="Quantidade em estoque">
              <input type="number" min="0" value={form.stock} onChange={e => update('stock', e.target.value)} placeholder="0" />
            </Field>

            <Field label="Unidade">
              <select value={form.unit} onChange={e => update('unit', e.target.value)}>
                {[
                  'Unidade',
                  'Litro',
                  'Quilo',
                  'Caixa',
                  'Metro',
                  'Cartela',
                  'Par',
                  'Saco',
                  'Peça',
                  'Rolo',
                  'Barra',
                ].map(item => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </Field>

            <Field label="Validade">
              <input type="date" value={form.expiration} onChange={e => update('expiration', e.target.value)} />
            </Field>

            <Field label="Garantia">
              <input value={form.warranty} onChange={e => update('warranty', e.target.value)} placeholder="Ex.: 90 dias" />
            </Field>
          </div>

          <div className="product-form-actions">
            <Button type="submit"><Save size={16} /> {editing ? 'ATUALIZAR' : 'SALVAR'}</Button>
            {editing && <Button type="button" variant="secondary" onClick={resetForm}>Cancelar</Button>}
          </div>
        </form>
      </section>

      <section className="panel">
        <div className="panel-head product-list-head">
          <div>
            <h3>Consultar produtos</h3>
            <p>{filtered.length} produto(s) encontrado(s)</p>
          </div>
          <div className="searchbox">
            <Search size={17} />
            <input placeholder="Código, nome, marca ou código de barras" value={query} onChange={e => setQuery(e.target.value)} />
          </div>
        </div>
        <ProductTable products={filtered} onEdit={edit} onDelete={del} />
      </section>
    </>
  );
}

function Field({ label, children, className = "" }) {

  return (

    <label className={`field ${className}`.trim()}>

      <span>{label}</span>

      {children}

    </label>

  );

}

function Clients({ clients, setClients }) {

  const blank = { name: '', phone: '', street: '', number: '', complement: '', neighborhood: '', city: '', zip: '', reference: '' };

  const [form, setForm] = useState(blank);

  const [query, setQuery] = useState('');

  const [editing, setEditing] = useState(null);

  const filtered = clients.filter(c => c.name.toLowerCase().includes(query.toLowerCase()) || c.phone.includes(query));

  const submit = (e) => {

    e.preventDefault();

    if (editing !== null) {

      setClients(old => old.map(c => c.id === editing ? { ...form, id: editing } : c));

    } else {

      setClients(old => [...old, { ...form, id: Date.now() }]);

    }

    setForm(blank);

    setEditing(null);

  };

  const edit = (c) => {

    setForm({ ...c });

    setEditing(c.id);

    window.scrollTo({ top: 0, behavior: 'smooth' });

  };

  const del = (id) => {

    if (confirm('Excluir cliente?')) setClients(old => old.filter(c => c.id !== id));

  };

  return (

    <>

      <PageTitle

        title="Cadastro de clientes"

        subtitle="Gerencie os dados e endereços dos seus clientes."

        action={

          <Button onClick={() => { setForm(blank); setEditing(null); }}>

            <Plus size={17} /> Novo cliente

          </Button>

        }

      />

      <section className="panel">

        <div className="panel-head">

          <div>

            <h3>{editing !== null ? 'Editar cliente' : 'Dados do cliente'}</h3>

            <p>Os campos com * são obrigatórios</p>

          </div>

        </div>

        <form onSubmit={submit} className="form-grid">

          <Field label="Nome do cliente *">

            <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Nome completo" />

          </Field>

          <Field label="Telefone">

            <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="(00) 00000-0000" />

          </Field>

          <Field label="Rua">

            <input value={form.street} onChange={e => setForm({ ...form, street: e.target.value })} placeholder="Rua / Avenida" />

          </Field>

          <Field label="Número">

            <input value={form.number} onChange={e => setForm({ ...form, number: e.target.value })} placeholder="Nº" />

          </Field>

          <Field label="Complemento">

            <input value={form.complement} onChange={e => setForm({ ...form, complement: e.target.value })} />

          </Field>

          <Field label="Bairro">

            <input value={form.neighborhood} onChange={e => setForm({ ...form, neighborhood: e.target.value })} />

          </Field>

          <Field label="Cidade">

            <input value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />

          </Field>

          <Field label="CEP">

            <input value={form.zip} onChange={e => setForm({ ...form, zip: e.target.value })} placeholder="00000-000" />

          </Field>

          <Field label="Ponto de referência">

            <input value={form.reference} onChange={e => setForm({ ...form, reference: e.target.value })} />

          </Field>

          <div className="form-actions">

            <Button type="submit"><Save size={16} />{editing !== null ? 'Atualizar cliente' : 'Salvar cliente'}</Button>

            {editing !== null && (
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setForm(blank);
                  setEditing(null);
                }}
              >
                Cancelar
              </Button>
            )}

          </div>

        </form>

      </section>

      <section className="panel">

        <div className="panel-head">

          <div>

            <h3>Consultar clientes</h3>

            <p>{filtered.length} cliente(s) cadastrado(s)</p>

          </div>

          <div className="searchbox">

            <Search size={17} />

            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Pesquisar nome ou telefone" />

          </div>

        </div>

        <div className="table-wrap">

          <table>

            <thead>

              <tr>

                <th>Cliente</th>

                <th>Telefone</th>

                <th>Cidade</th>

                <th>Endereço</th>

                <th>Ações</th>

              </tr>

            </thead>

            <tbody>

              {filtered.map(c => (

                <tr key={c.id}>

                  <td><b>{c.name}</b></td>

                  <td>{c.phone || '—'}</td>

                  <td>{c.city || '—'}</td>

                  <td>{[c.street, c.number, c.neighborhood].filter(Boolean).join(', ') || '—'}</td>

                  <td className="actions">

                    <button onClick={() => edit(c)}><Pencil size={16} /></button>

                    <button onClick={() => del(c.id)}><Trash2 size={16} /></button>

                  </td>

                </tr>

              ))}

              {!filtered.length && <tr><td colSpan="5" className="empty">Nenhum cliente encontrado.</td></tr>}

            </tbody>

          </table>

        </div>

      </section>

    </>

  );

}

function Config({ interest, setInterest }) {

  return (

    <>

      <PageTitle title="Configuração" subtitle="Defina os juros aplicados nas opções de parcelamento." />

      <section className="panel narrow">

        <div className="panel-head">

          <div>

            <h3>Parcelamento</h3>

            <p>Percentual de juros por quantidade de parcelas</p>

          </div>

        </div>

        <form onSubmit={e => { e.preventDefault(); alert('Configurações atualizadas!'); }} className="interest-list">

          {Array.from({ length: 10 }, (_, i) => (

            <Field key={i} label={`Juros ${i + 1}x ${i === 0 ? 'parcela' : 'parcelas'}`}>

              <div className="suffix-input">

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={interest[i] ?? 0}
                  onChange={e =>
                    setInterest(old =>
                      old.map((value, index) =>
                        index === i ? e.target.value : value
                      )
                    )
                  }
                />

                <span>%</span>

              </div>

            </Field>

          ))}

          <Button type="submit"><Save size={16} /> Atualizar configurações</Button>

        </form>

      </section>

    </>

  );

}

function Quotes({ products, clients, quotes, setQuotes }) {

  const [client, setClient] = useState('');

  const [search, setSearch] = useState('');

  const [cart, setCart] = useState([]);

  const [payment, setPayment] = useState('À vista - Preço normal');

  const [discount, setDiscount] = useState(0);

  const [observation, setObservation] = useState('');

  const filtered = products.filter(p => `${p.id} ${p.name} ${p.barcode}`.toLowerCase().includes(search.toLowerCase()));

  const add = (p) => {

    setCart(old => {

      const found = old.find(x => x.id === p.id);

      return found ? old.map(x => x.id === p.id ? { ...x, qty: Number(x.qty) + 1 } : x) : [...old, { ...p, qty: 1 }];

    });

  };

  const subtotal = cart.reduce((s, p) => s + Number(p.price) * Number(p.qty), 0);

  const total = subtotal * (1 - Number(discount || 0) / 100);

  const save = () => {

    if (!client) return alert('Selecione um cliente.');

    if (!cart.length) return alert('Adicione produtos ao orçamento.');

    setQuotes(old => [{

      id: String(Date.now()).slice(-6),

      client,

      total,

      date: new Date().toISOString().slice(0, 10),

      status: 'Aberto',

      payment,

      observation

    }, ...old]);

    alert('Orçamento salvo!');

    setCart([]);

  };

  return (

    <>

      <PageTitle

        title="Orçamento"

        subtitle="Monte um orçamento, selecione o cliente e adicione produtos."

        action={

          <Button variant="secondary" onClick={() => window.print()}>

            <Printer size={16} /> Imprimir orçamento

          </Button>

        }

      />

      <section className="panel">

        <div className="panel-head">

          <div>

            <h3>Informações do orçamento</h3>

            <p>Cliente, pagamento e observações</p>

          </div>

        </div>

        <div className="form-grid">

          <Field label="Cliente">

            <select value={client} onChange={e => setClient(e.target.value)}>

              <option value="">Selecione o cliente</option>

              {clients.map(c => <option key={c.id}>{c.name}</option>)}

            </select>

          </Field>

          <Field label="Forma de pagamento">

            <select value={payment} onChange={e => setPayment(e.target.value)}>

              <option>À vista - Preço normal</option>

              <option>Parcelado - 3x</option>

              <option>Parcelado - 1x até 10x</option>

            </select>

          </Field>

          <Field label="Aplicar desconto (%)">

            <input type="number" min="0" max="100" value={discount} onChange={e => setDiscount(e.target.value)} />

          </Field>

          <Field label="Observação do orçamento">

            <input value={observation} onChange={e => setObservation(e.target.value)} placeholder="Observações..." />

          </Field>

        </div>

      </section>

      <section className="panel">

        <div className="panel-head">

          <div>

            <h3>Adicionar produtos</h3>

            <p>Procure por código, nome ou código de barras</p>

          </div>

          <div className="searchbox">

            <Search size={17} />

            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Procurar produto" />

          </div>

        </div>

        <div className="product-picks">

          {filtered.map(p => (

            <button key={p.id} className="pick" onClick={() => add(p)}>

              <span>

                <b>{p.name}</b>

                <small>Código {p.id} · {money(p.price)}</small>

              </span>

              <Plus size={18} />

            </button>

          ))}

        </div>

      </section>

      <section className="panel">

        <div className="panel-head">

          <div>

            <h3>Itens do orçamento</h3>

            <p>{cart.length} item(ns)</p>

          </div>

        </div>

        <div className="table-wrap">

          <table>

            <thead>

              <tr>

                <th>Código</th>

                <th>Produto</th>

                <th>Quantidade</th>

                <th>Valor unitário</th>

                <th>Subtotal</th>

                <th></th>

              </tr>

            </thead>

            <tbody>

              {cart.map(p => (

                <tr key={p.id}>

                  <td className="code">{p.id}</td>

                  <td>{p.name}</td>

                  <td>

                    <input
                      className="qty"
                      type="number"
                      min="1"
                      value={p.qty}
                      onChange={e =>
                        setCart(old =>
                          old.map(item =>
                            item.id === p.id
                              ? { ...item, qty: e.target.value }
                              : item
                          )
                        )
                      }
                    />

                  </td>

                  <td>{money(p.price)}</td>

                  <td>{money(p.price * p.qty)}</td>

                  <td className="actions">

                    <button onClick={() => setCart(old => old.filter(x => x.id !== p.id))}><X size={16} /></button>

                  </td>

                </tr>

              ))}

              {!cart.length && <tr><td colSpan="6" className="empty">Adicione produtos para compor o orçamento.</td></tr>}

            </tbody>

          </table>

        </div>

        <div className="total-row">

          <span>Total do orçamento</span>

          <strong>{money(total)}</strong>

        </div>

        <div className="form-actions">

          <Button onClick={save}><Save size={16} /> Salvar orçamento</Button>

          <Button variant="secondary" onClick={() => { save(); setTimeout(() => window.print(), 100); }}>

            <Printer size={16} /> Salvar e imprimir

          </Button>

        </div>

      </section>

      <section className="panel">

        <div className="panel-head">

          <div>

            <h3>Consultar orçamento</h3>

            <p>Orçamentos registrados</p>

          </div>

        </div>

        <div className="table-wrap">

          <table>

            <thead>

              <tr>

                <th>Código</th>

                <th>Cliente</th>

                <th>Valor</th>

                <th>Data</th>

                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              {quotes.map(q => (

                <tr key={q.id}>

                  <td className="code">{q.id}</td>

                  <td>{q.client}</td>

                  <td>{money(q.total)}</td>

                  <td>{q.date}</td>

                  <td><span className="pill success">{q.status}</span></td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </section>

    </>

  );

}

function Stock({ products }) {

  const [query, setQuery] = useState('');

  const rows = products.filter(p => `${p.id} ${p.name}`.toLowerCase().includes(query.toLowerCase()));

  return (

    <>

      <PageTitle

        title="Consulta de estoque"

        subtitle="Acompanhe quantidade disponível e níveis mínimos."

        action={

          <Button variant="secondary" onClick={() => window.print()}>

            <Printer size={16} /> Imprimir filtro

          </Button>

        }

      />

      <section className="panel">

        <div className="panel-head">

          <div>

            <h3>Estoque de produtos</h3>

            <p>Consulte os itens cadastrados</p>

          </div>

          <div className="searchbox">

            <Search size={17} />

            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Pesquisar produto" />

          </div>

        </div>

        <ProductTable products={rows} />

      </section>

    </>

  );

}

function Sales({ products }) {

  const [cart, setCart] = useState([]);

  const [pay, setPay] = useState('À vista - Preço normal');

  const total = cart.reduce((s, p) => s + p.price * p.qty, 0);

  return (

    <>

      <PageTitle title="Venda" subtitle="Registre os produtos e finalize a venda." />

      <section className="panel">

        <div className="panel-head">

          <div>

            <h3>Produtos da venda</h3>

            <p>Selecione os produtos para adicionar</p>

          </div>

        </div>

        <div className="product-picks">

          {products.map(p => (

            <button className="pick" key={p.id} onClick={() => setCart(old => {

              const f = old.find(x => x.id === p.id);

              return f ? old.map(x => x.id === p.id ? { ...x, qty: x.qty + 1 } : x) : [...old, { ...p, qty: 1 }];

            })}>

              <span>

                <b>{p.name}</b>

                <small>{money(p.price)}</small>

              </span>

              <Plus size={18} />

            </button>

          ))}

        </div>

        <div className="total-row">

          <span>Total da venda</span>

          <strong>{money(total)}</strong>

        </div>

        <div className="form-grid">

          <Field label="Forma de pagamento">

            <select value={pay} onChange={e => setPay(e.target.value)}>

              <option>À vista - Preço normal</option>

              <option>Parcelado - 3x</option>

              <option>Parcelado - 1x até 10x</option>

            </select>

          </Field>

        </div>

        <div className="form-actions">

          <Button onClick={() => {

            if (!cart.length) return alert('Adicione produtos.');

            alert(`Venda registrada: ${money(total)} · ${pay}`);

            setCart([]);

          }}>

            <ShoppingCart size={16} /> Finalizar venda

          </Button>

        </div>

      </section>

    </>

  );

}

function Reports({ quotes }) {

  const total = quotes.reduce((s, q) => s + Number(q.total), 0);

  return (

    <>

      <PageTitle

        title="Relatório de vendas"

        subtitle="Resumo dos orçamentos registrados."

        action={

          <Button variant="secondary" onClick={() => window.print()}>

            <Printer size={16} /> Imprimir

          </Button>

        }

      />

      <div className="stats-grid">

        <Stat label="Registros" value={quotes.length} hint="Vendas e orçamentos" icon={FileText} tone="blue" />

        <Stat label="Valor total" value={money(total)} hint="Soma dos registros" icon={CircleDollarSign} tone="green" />

      </div>

      <section className="panel">

        <div className="panel-head">

          <div>

            <h3>Movimentações</h3>

            <p>Dados disponíveis no sistema</p>

          </div>

        </div>

        <div className="table-wrap">

          <table>

            <thead>

              <tr>

                <th>Data</th>

                <th>Cliente</th>

                <th>Código</th>

                <th>Tipo</th>

                <th>Valor</th>

              </tr>

            </thead>

            <tbody>

              {quotes.map(q => (

                <tr key={q.id}>

                  <td>{q.date}</td>

                  <td>{q.client}</td>

                  <td>{q.id}</td>

                  <td>{q.payment || 'Orçamento'}</td>

                  <td>{money(q.total)}</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        <div className="total-row">

          <span>Total</span>

          <strong>{money(total)}</strong>

        </div>

      </section>

    </>

  );

}

function Expenses() {

  const [items, setItems] = useStored('mr-expenses', []);

  const [form, setForm] = useState({ date: '', responsible: '', cnpj: '', description: '', value: '' });

  return (

    <>

      <PageTitle title="Lançamento de despesas" subtitle="Registre despesas e acompanhe os lançamentos." />

      <section className="panel">

        <form className="form-grid" onSubmit={e => {

          e.preventDefault();

          setItems(old => [{ ...form, id: Date.now() }, ...old]);

          setForm({ date: '', responsible: '', cnpj: '', description: '', value: '' });

        }}>

          <Field label="Data">

            <input type="date" required value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />

          </Field>

          <Field label="Responsável">

            <input required value={form.responsible} onChange={e => setForm({ ...form, responsible: e.target.value })} />

          </Field>

          <Field label="CNPJ">

            <input value={form.cnpj} onChange={e => setForm({ ...form, cnpj: e.target.value })} />

          </Field>

          <Field label="Despesa">

            <input required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />

          </Field>

          <Field label="Valor (R$)">

            <input
              type="number"
              step="0.01"
              min="0"
              required
              value={form.value}
              onChange={e => setForm({ ...form, value: e.target.value })}
            />

          </Field>

          <div className="form-actions">

            <Button type="submit"><Save size={16} /> Salvar despesa</Button>

          </div>

        </form>

      </section>

      <section className="panel">

        <div className="panel-head">

          <h3>Despesas lançadas</h3>

        </div>

        <div className="table-wrap">

          <table>

            <thead>

              <tr>

                <th>Data</th>

                <th>Despesa</th>

                <th>Responsável</th>

                <th>Valor</th>

              </tr>

            </thead>

            <tbody>

              {items.map(x => (

                <tr key={x.id}>

                  <td>{x.date}</td>

                  <td>{x.description}</td>

                  <td>{x.responsible}</td>

                  <td>{money(x.value)}</td>

                </tr>

              ))}

              {!items.length && <tr><td colSpan="4" className="empty">Nenhuma despesa lançada.</td></tr>}

            </tbody>

          </table>

        </div>

      </section>

    </>

  );

}

function Purchases() {

  return (

    <>

      <PageTitle title="Relatório de compras" subtitle="Área preparada para registrar e consultar compras e notas fiscais." />

      <section className="panel">

        <div className="empty large">

          <Receipt size={32} />

          <b>Relatório de compras</b>

          <span>Os registros de compras ainda não possuem dados cadastrados.</span>

        </div>

      </section>

    </>

  );

}

export default function App() {

  const [products, setProducts] = useStored('mr-products', initialProducts);

  const [clients, setClients] = useStored('mr-clients', initialClients);

  const [quotes, setQuotes] = useStored('mr-quotes', initialQuotes);

  const [interest, setInterest] = useStored('mr-interest', Array(10).fill(0));

  return (

    <Shell>

      <Routes>

        <Route path="/" element={<Dashboard products={products} clients={clients} quotes={quotes} />} />

        <Route path="/produtos" element={<Products products={products} setProducts={setProducts} />} />

        <Route path="/clientes" element={<Clients clients={clients} setClients={setClients} />} />

        <Route path="/estoque" element={<Stock products={products} />} />

        <Route path="/orcamentos" element={<Quotes products={products} clients={clients} quotes={quotes} setQuotes={setQuotes} />} />

        <Route path="/vendas" element={<Sales products={products} />} />

        <Route path="/configuracao" element={<Config interest={interest} setInterest={setInterest} />} />

        <Route path="/relatorios/vendas" element={<Reports quotes={quotes} />} />

        <Route path="/relatorios/compras" element={<Purchases />} />

        <Route path="/despesas" element={<Expenses />} />

        <Route path="*" element={<Dashboard products={products} clients={clients} quotes={quotes} />} />

      </Routes>

    </Shell>

  );

}
