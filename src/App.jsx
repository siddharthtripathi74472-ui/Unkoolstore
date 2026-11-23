import heroModel from "../hero-model.png";
import logo from "../unkool-logo.jpeg.jpeg";
import { ArrowRight, Search, UserRound, ShoppingCart, ShoppingBag, Menu, X, Shirt, Coffee, Glasses, UploadCloud, Type, ImagePlus, Sparkles, Gem, SlidersHorizontal, Truck, Heart, RotateCcw } from "lucide-react";
import { useState } from "react";
const catalog = [
  {id:"tee",name:"T-Shirt",price:599,colors:["#171717","#f8f7f2","#ffdf00","#e94e55","#3478e8","#168a5a","#8a4dc2"]},
  {id:"mug",name:"Mug",price:349,colors:["#f8f7f2","#171717","#ffdf00","#e94e55","#3478e8"]},
  {id:"cap",name:"Cap",price:399,colors:["#171717","#f8f7f2","#ffdf00","#e94e55","#3478e8"]},
  {id:"hoodie",name:"Hoodie",price:999,colors:["#171717","#f8f7f2","#777b83","#ffdf00"]},
  {id:"keychain",name:"Keychain",price:199,colors:["#171717","#f8f7f2","#ffdf00","#e94e55"]},
  {id:"bag",name:"Bag",price:499,colors:["#d8c2a5","#171717","#f8f7f2","#ffdf00"]}
];
const initialText = "Dream\\nBigger";
const templates = [
  {name:"Dream Bigger",text:"Dream\\nBigger",font:"script"},
  {name:"Good Vibes",text:"GOOD VIBES\\nONLY",font:"bold"},
  {name:"Stay Original",text:"STAY\\nORIGINAL",font:"minimal"}
];

function ProductShape({type,color}) {
  const common={fill:color,stroke:"rgba(0,0,0,.10)",strokeWidth:2,strokeLinejoin:"round"};
  if(type==="tee") return <svg className="product-svg tee-svg" viewBox="0 0 320 300" aria-label="T-shirt preview"><path {...common} d="M103 30 130 18 Q160 43 190 18 L217 30 298 88 265 143 229 122 237 282 83 282 91 122 55 143 22 88Z"/><path d="M130 19 Q160 65 190 19" fill="none" stroke="rgba(255,255,255,.26)" strokeWidth="8"/></svg>;
  if(type==="hoodie") return <svg className="product-svg" viewBox="0 0 320 300"><path {...common} d="M103 36 130 24 Q160 66 190 24 L217 36 296 94 265 148 230 125 239 282 81 282 90 125 55 148 24 94Z"/><path d="M130 25 Q160 82 190 25" fill="none" stroke="rgba(255,255,255,.23)" strokeWidth="9"/><path d="M120 205 Q160 225 200 205 L194 252 126 252Z" fill="none" stroke="rgba(255,255,255,.24)" strokeWidth="4"/></svg>;
  if(type==="mug") return <><svg className="product-svg mug-svg" viewBox="0 0 320 300"><path d="M218 92 C298 74 298 204 218 193" fill="none" stroke={color} strokeWidth="27"/><path {...common} d="M72 67 Q72 53 88 53 H220 Q236 53 236 69 L222 245 Q220 260 204 260 H103 Q87 260 85 245Z"/><path d="M91 75 H218" stroke="rgba(255,255,255,.28)" strokeWidth="6"/></svg></>;
  if(type==="cap") return <svg className="product-svg" viewBox="0 0 320 300"><path {...common} d="M45 171 Q55 65 158 57 Q264 57 279 171 Q218 203 45 171Z"/><path {...common} d="M45 168 Q130 155 276 171 Q258 231 137 231 Q71 224 45 168Z"/><path d="M158 59 Q157 120 158 172" fill="none" stroke="rgba(255,255,255,.22)" strokeWidth="4"/></svg>;
  if(type==="keychain") return <svg className="product-svg" viewBox="0 0 320 300"><circle cx="160" cy="54" r="26" fill="none" stroke="#a8a8a8" strokeWidth="12"/><path d="M160 80 V105" stroke="#aaa" strokeWidth="9"/><path {...common} d="M160 101 L249 148 249 242 160 278 71 242 71 148Z"/><path d="M160 101 V278 M71 148 160 194 249 148" fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="4"/></svg>;
  return <svg className="product-svg" viewBox="0 0 320 300"><path {...common} d="M70 98 Q70 76 94 76 H226 Q250 76 250 98 L263 271 H57Z"/><path d="M112 80 Q112 22 160 22 Q208 22 208 80" fill="none" stroke={color} strokeWidth="17"/><path d="M112 80 Q112 34 160 34 Q208 34 208 80" fill="none" stroke="rgba(0,0,0,.15)" strokeWidth="3"/></svg>;
}

function Artwork({text, image, font, ink, compact=false}) {
  return <div className={`artwork ${font} ${compact?"compact":""}`} style={{color:ink}}>
    {image ? <img src={image} alt="Your uploaded design"/> : text.split("\\n").map((line,i)=><span key={i}>{line}</span>)}
  </div>;
}
function ProductPreview({type,color,text,image,font,ink}) {
  return <div className={`product-stage stage-${type}`}>
    <div className="product-shadow"/>
    <ProductShape type={type} color={color}/>
    <Artwork text={text} image={image} font={font} ink={ink}/>
    <span className="preview-spark">✳</span>
  </div>;
}
function ProductIcon({id,size=19}) {
  const props={size,strokeWidth:2};
  if(id==="tee") return <Shirt {...props}/>;
  if(id==="mug") return <Coffee {...props}/>;
  if(id==="cap") return <Glasses {...props}/>;
  if(id==="hoodie") return <ShoppingBag {...props}/>;
  if(id==="keychain") return <Sparkles {...props}/>;
  return <ShoppingBag {...props}/>;
}

export default function App(){
  const [productId,setProductId]=useState("tee");
  const [color,setColor]=useState("#171717");
  const [text,setText]=useState(initialText);
  const [font,setFont]=useState("script");
  const [ink,setInk]=useState("#ffdf00");
  const [image,setImage]=useState("");
  const [cart,setCart]=useState(0);
  const [notice,setNotice]=useState("");
  const [menu,setMenu]=useState(false);
  const [showUpload,setShowUpload]=useState(false);
  const fileRef=useRef(null);
  const product=catalog.find(p=>p.id===productId)||catalog[0];

  const chooseProduct=(id)=>{
    setProductId(id);
    const next=catalog.find(p=>p.id===id);
    if(next) setColor(next.colors[0]);
  };
  const uploadFile=(file)=>{
    if(!file) return;
    if(!file.type.startsWith("image/")) {setNotice("Please upload a JPG, PNG or WEBP image.");return;}
    const reader=new FileReader();
    reader.onload=()=>{setImage(reader.result);setNotice("Your artwork is now on the product preview.");};
    reader.readAsDataURL(file);
  };
  const addToBag=()=>{setCart(v=>v+1);setNotice(`${product.name} added to your bag — preview saved in this demo.`);};
  const applyTemplate=(t)=>{setText(t.text);setFont(t.font);setImage("");setInk("#ffdf00");};
  const reset=()=>{setText(initialText);setImage("");setFont("script");setInk("#ffdf00");setColor(product.colors[0]);};

  return <div className="site">
    <div className="announcement">✦ FREE YOUR IMAGINATION <b>✦</b> MADE TO BE YOURS ✦</div>
    <header className="header">
    <a className="brand" href="#top"><img src={logo} alt="UNKOOL" style={{width:"120px",height:"55px",objectFit:"contain"}} /></a>     
      <nav className={menu?"nav nav-open":"nav"}>
        <a className="active" href="#top" onClick={()=>setMenu(false)}>Home</a>
        <a href="#customise" onClick={()=>setMenu(false)}>Customise</a>
        <a href="#collection" onClick={()=>setMenu(false)}>Shop</a>
        <a href="#how" onClick={()=>setMenu(false)}>How It Works</a>
        <a href="#about" onClick={()=>setMenu(false)}>About</a>
      </nav>
      <div className="header-right">
        <button aria-label="Search" className="icon-btn"><Search size={17}/></button>
        <button aria-label="Account" className="icon-btn"><UserRound size={17}/></button>
        <button aria-label="Cart" className="icon-btn cart-icon"><ShoppingCart size={17}/><i>{cart}</i></button>
        <a href="#customise" className="make-yours">Make Yours <ArrowRight size={13}/></a>
        <button className="mobile-menu" onClick={()=>setMenu(v=>!v)} aria-label="Menu">{menu?<X/>:<Menu/>}</button>
      </div>
    </header>

    <main id="top">
      <section className="hero">
        <div className="hero-bg-yellow"/>
        <div className="hero-dots dots-left"/>
        <div className="hero-copy">
          <div className="eyebrow">NOT MADE TO BLEND IN <span/></div>
          <div className="crown">♛</div>
          <h1>Your idea.<br/><em>Your thing.</em></h1>
          <p>Customise tees, mugs, keychains & more.<br/>Put your <b>personality</b> on something you can hold.</p>
          <a href="#customise" className="start-btn">Start Customising <ArrowRight size={17}/></a>
          <div className="handwritten">Be UnKool <i>⌁</i></div>
        </div>

        <div className="hero-model">
          <div className="model-rays">╱╲</div>
          <img src={heroModel} alt="UnKool Model" />
          <div className="model-print"><Artwork text={text} image={image} font={font} ink={ink} compact/></div>
          <span className="model-doodle">✳</span>
        </div>

        <section className="customizer" id="customise" aria-label="Customise your product">
          <div className="product-picks">
            {catalog.map(p=><button key={p.id} onClick={()=>chooseProduct(p.id)} className={productId===p.id?"pick active":"pick"}><ProductIcon id={p.id}/><b>{p.name}</b></button>)}
          </div>
          <div className="steps"><span className="step-current"><b>1</b>Select</span><i/><span><b>2</b>Design</span><i/><span><b>3</b>Preview</span></div>
          <div className="customizer-body">
            <div className="edit-controls">
              <div className="field-heading">Choose Product Colour <button onClick={reset} title="Reset design"><RotateCcw size={13}/></button></div>
              <div className="swatches">{product.colors.map(c=><button key={c} aria-label={`Select colour ${c}`} onClick={()=>setColor(c)} className={color===c?"swatch selected":"swatch"} style={{background:c}}/>)}</div>
              <div className="field-heading upload-heading">Upload Your Design <ImagePlus size={14}/></div>
              <button className="upload-zone" onClick={()=>fileRef.current?.click()} onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();uploadFile(e.dataTransfer.files?.[0]);}}>
                <UploadCloud size={23}/><b>{image?"Design uploaded ✓":"Drag & drop or choose file"}</b><small>JPG, PNG, WEBP · Max 10 MB</small>
              </button>
              <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp" hidden onChange={e=>uploadFile(e.target.files?.[0])}/>
              <div className="field-heading text-heading">Add Your Text <Type size={14}/></div>
              <textarea value={text} onChange={e=>{setText(e.target.value);setImage("");}} rows="2" placeholder="Write something that feels like you..."/>
              <div className="style-row">
                <select value={font} onChange={e=>setFont(e.target.value)} aria-label="Choose font"><option value="script">Handwritten</option><option value="bold">Bold</option><option value="minimal">Minimal</option></select>
                <div className="ink-colors">{["#ffdf00","#ffffff","#171717","#f06a56","#4c83e8"].map(c=><button key={c} onClick={()=>setInk(c)} className={ink===c?"ink-picked":""} style={{background:c}} aria-label={`Text colour ${c}`}/>)}</div>
              </div>
              <div className="template-row"><span>Try a style</span>{templates.map(t=><button key={t.name} onClick={()=>applyTemplate(t)}>{t.name}</button>)}</div>
            </div>
            <div className="live-preview">
              <div className="preview-top"><b>YOUR LIVE PREVIEW</b><span><i/> LIVE</span></div>
              <div className="preview-canvas"><ProductPreview type={productId} color={color} text={text} image={image} font={font} ink={ink}/></div>
              <div className="preview-caption"><span>{product.name} · Front view</span><button onClick={reset}>Reset</button></div>
              <button className="add-cart" onClick={addToBag}><ShoppingBag size={15}/> Add to Cart <b>₹{product.price}</b></button>
            </div>
          </div>
          {notice&&<div className="notice" role="status">{notice}<button onClick={()=>setNotice("")}>×</button></div>}
        </section>
      </section>

      <section className="benefits" id="about">
        <div><Gem/><span><b>Premium Quality</b><small>That Lasts</small></span></div><i/>
        <div><SlidersHorizontal/><span><b>Fully Customisable</b><small>Your Style, Your Way</small></span></div><i/>
        <div><Truck/><span><b>Fast Delivery</b><small>Across India</small></span></div><i/>
        <div><Heart/><span><b>Loved by Gen Z</b><small>Because You’re Unique</small></span></div>
      </section>

      <section className="collection" id="collection">
        <div className="section-title"><div><span>MAKE IT YOURS</span><h2>Explore Our <em>Collection</em></h2></div><a href="#customise">Shop All <ArrowRight size={14}/></a></div>
        <div className="collection-grid">
          {catalog.map(p=><button className="collection-card" key={p.id} onClick={()=>{chooseProduct(p.id);document.getElementById("customise")?.scrollIntoView({behavior:"smooth"});}}>
            <div className="collection-art"><div className="mini-product" style={{"--mini-color":p.colors[0]}}><ProductShape type={p.id} color={p.colors[0]}/></div><span className="collection-label">{p.name} <ArrowRight size={12}/></span></div>
          </button>)}
        </div>
      </section>
      <section className="how" id="how"><div><span>YOUR IDEA. OUR CREATION.</span><h2>Made by you.<br/><em>Made to be yours.</em></h2></div><a className="start-btn" href="#customise">Create Your Own <ArrowRight size={17}/></a></section>
    </main>
    <footer><a className="brand" href="#top"><img src={logo} alt="UNKOOL" className="brand-logo" /></a> href="#top"><img src={logo} alt="UNKOOL" className="brand-logo" /></a> href="#top"><img src={logo} alt="UNKOOL" className="brand-logo" /></a> href="#top"><span className="brand-mark">U</span><span>UnKool</span></a><span>Personalised. Premium. UnKool.</span><small>© 2026 UnKool. Made to be yours.</small></footer>
  </div>;
}
