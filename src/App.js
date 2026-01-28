<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ARAM.GG 终极攻略板</title>
    <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
        body { background-color: #f1f5f9; margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        .container { padding: 40px 20px; max-width: 1400px; margin: 0 auto; }
        header { text-align: center; margin-bottom: 50px; }
        h1 { color: #1d4ed8; font-size: 42px; margin-bottom: 10px; }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 25px; }
        .card { background: #ffffff; border-radius: 28px; padding: 25px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); border: 1px solid #e2e8f0; transition: transform 0.2s; }
        .card:hover { transform: translateY(-5px); }
        .hero-header { display: flex; align-items: center; gap: 18px; margin-bottom: 20px; border-bottom: 1px solid #f1f5f9; padding-bottom: 18px; }
        .hero-avatar { width: 64px; height: 64px; border-radius: 16px; border: 3px solid #e2e8f0; object-fit: cover; }
        .hero-name { font-size: 22px; font-weight: bold; color: #1e293b; margin: 0; }
        .hero-reason { font-size: 12px; color: #64748b; margin: 4px 0 0 0; }
        .item-section { background: #f8fafc; border-radius: 20px; padding: 15px; margin-bottom: 20px; }
        .sub-label { font-size: 11px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
        .badge-row { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 10px; }
        .item-badge { background: white; color: #475569; padding: 5px 12px; border-radius: 8px; font-size: 12px; border: 1px solid #e2e8f0; font-weight: 600; }
        .item-badge-神 { background: #2563eb; color: white; border: none; }
        .hex-badge { color: white; padding: 6px 14px; border-radius: 12px; font-size: 13px; font-weight: bold; cursor: help; margin-bottom: 8px; display: inline-block; margin-right: 8px; border: 1.5px solid transparent; }
        .god-badge { border: 2px solid #ffd700 !important; animation: glow 2s infinite ease-in-out; }
        @keyframes glow { 0%, 100% { box-shadow: 0 0 5px #ffd700; } 50% { box-shadow: 0 0 20px #ffd700; } }
        .tooltip-wrap { position: relative; display: inline-block; }
        .tooltip-box { position: absolute; bottom: 150%; left: 50%; transform: translateX(-50%); background: #000; padding: 12px; border-radius: 20px; z-index: 100; width: 120px; text-align: center; box-shadow: 0 15px 40px rgba(0,0,0,0.7); visibility: hidden; opacity: 0; transition: opacity 0.2s; pointer-events: none; }
        .tooltip-wrap:hover .tooltip-box { visibility: visible; opacity: 1; }
        .img-wrap { background: #111; border-radius: 12px; padding: 4px; margin-bottom: 8px; display: flex; justify-content: center; }
        .tooltip-img { width: 90px; height: 90px; border-radius: 10px; }
        .marksman-section { margin-top: 60px; background: white; padding: 30px; border-radius: 30px; border: 2px solid #fed7aa; }
        .marksman-grid { display: flex; flex-wrap: wrap; gap: 15px; justify-content: center; }
        .marksman-btn { display: flex; align-items: center; padding: 14px 24px; background: #fff7ed; border: 1px solid #fdba74; border-radius: 16px; color: #c2410c; font-weight: 800; font-size: 16px; }
    </style>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel">
        const { useState } = React;
        const IMAGE_MAP = {
            "火人": "https://opgg-static.akamaized.net/meta/images/lol/16.2.1/champion/Brand.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto:good,f_webp,w_160,h_160&v=1602",
            "杰斯": "https://opgg-static.akamaized.net/meta/images/lol/16.2.1/champion/Jayce.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto:good,f_webp,w_160,h_160&v=1602",
            "阿狸": "https://opgg-static.akamaized.net/meta/images/lol/16.2.1/champion/Ahri.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto:good,f_webp,w_160,h_160&v=1602",
            "拉克丝": "https://opgg-static.akamaized.net/meta/images/lol/16.2.1/champion/Lux.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto:good,f_webp,w_160,h_160&v=1602",
            "大眼": "https://opgg-static.akamaized.net/meta/images/lol/16.2.1/champion/Velkoz.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto:good,f_webp,w_160,h_160&v=1602",
            "女神泪": "https://opgg-static.akamaized.net/meta/images/lol/16.2.1/item/3070.png?image=q_auto:good,f_webp,w_64,h_64&v=1602",
            "命定灰烬": "https://opgg-static.akamaized.net/meta/images/lol/16.2.1/item/2508.png?image=q_auto:good,f_webp,w_64,h_64&v=1602",
            "炼狱导管": "https://opgg-static.akamaized.net/meta/images/lol/latest/aram-augment/InfernalConduit_large.png?image=q_auto:good,f_webp,w_120&v=1769499572",
            "尤里卡": "https://opgg-static.akamaized.net/meta/images/lol/latest/aram-augment/Eureka_large.png?image=q_auto:good,f_webp,w_120&v=1769499572",
            "一板一眼": "https://opgg-static.akamaized.net/meta/images/lol/latest/aram-augment/SlowAndSteady_large.png?image=q_auto:good,f_webp,w_64,h_64&v=1602",
            "魔法转物理": "https://opgg-static.akamaized.net/meta/images/lol/latest/aram-augment/Escapade_large.png?image=q_auto:good,f_webp,w_64,h_64&v=1602"
        };
        const THEME = { P: "#a855f7", G: "#f59e0b", S: "#94a3b8", GOD: "#ffd700" };

        const Tooltip = ({ title, type, priority, children }) => {
            const imgUrl = IMAGE_MAP[title] || "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/item-icons/3157.png";
            return (
                <div className="tooltip-wrap">
                    {children}
                    <div className="tooltip-box" style={{ border: priority === "GOD" ? `2.5px solid ${THEME.GOD}` : `1.5px solid ${THEME[type] || '#333'}` }}>
                        <div className="img-wrap"><img src={imgUrl} className="tooltip-img" /></div>
                        <div style={{ fontSize: "12px", fontWeight: "bold", color: priority === "GOD" ? THEME.GOD : "#fff" }}>
                            {priority === "GOD" && "👑 "}{title}
                        </div>
                    </div>
                </div>
            );
        };

        function App() {
            const heroes = [
                { id: 1, name: "火人", reason: "AOE及灼烧，伤害爆表。", startItems: ["女神泪", "命定灰烬"], finalItems: ["兰德里的折磨", "影焰", "大帽", "法穿棒"], usePriority: true, hex: [{ name: "炼狱导管", type: "P", priority: "GOD" }, { name: "易损", type: "G", priority: "S" }, { name: "尤里卡", type: "P", priority: "S" }, { name: "魔法飞弹", type: "G", priority: "S" }, { name: "珠光护手", type: "P", priority: "Other" }] },
                { id: 2, name: "杰斯", reason: "手长爆发，Poke无敌。", usePriority: true, hex: [{ name: "一板一眼", type: "G", priority: "GOD" }, { name: "老练狙神", type: "G", priority: "S" }, { name: "魔法转物理", type: "S", priority: "Other" }] },
                { id: 3, name: "阿狸", hex: [{ name: "尤里卡", type: "P" }, { name: "巨人杀手", type: "P" }, { name: "魔法飞弹", type: "G" }] },
                { id: 4, name: "拉克丝", hex: [{ name: "尤里卡", type: "P" }, { name: "珠光护手", type: "P" }] }
                // ... 数据太多此处省略，建议你直接从上次的代码粘贴数据部分
            ];

            return (
                <div className="container">
                    <header><h1>ARAM.GG 攻略板</h1><p style={{ color: "#64748b", fontSize: "18px" }}>👑神级核心 > 🔥S级强势 > ✅常规参考</p></header>
                    <div className="grid">
                        {heroes.map(hero => (
                            <div key={hero.id} className="card">
                                <div className="hero-header">
                                    <img src={IMAGE_MAP[hero.name]} className="hero-avatar" />
                                    <div><h3 className="hero-name">{hero.name}</h3><p className="hero-reason">{hero.reason || "长手消耗法师"}</p></div>
                                </div>
                                {hero.startItems && (
                                    <div className="item-section">
                                        <div className="sub-label">☀️ 出门装</div>
                                        <div className="badge-row">{hero.startItems.map(i => <Tooltip key={i} title={i} type="S"><span className="item-badge">{i}</span></Tooltip>)}</div>
                                        <div className="sub-label">🏆 神装参考</div>
                                        <div className="badge-row">{hero.finalItems.map(i => <Tooltip key={i} title={i} type="G"><span className="item-badge item-badge-神">{i}</span></Tooltip>)}</div>
                                    </div>
                                )}
                                <div>
                                    {hero.usePriority ? ["GOD", "S", "Other"].map(pri => {
                                        const list = hero.hex.filter(h => h.priority === pri);
                                        if (list.length === 0) return null;
                                        return (
                                            <div key={pri} style={{ marginBottom: '15px' }}>
                                                <div className="sub-label" style={{ color: pri === "GOD" ? THEME.GOD : "#64748b" }}>{pri === "GOD" ? "👑 神级核心" : pri === "S" ? "🔥 S级强势" : "✅ 备选"}</div>
                                                {list.map(h => <Tooltip key={h.name} title={h.name} type={h.type} priority={h.priority}><span className={`hex-badge ${h.priority === "GOD" ? "god-badge" : ""}`} style={{ background: THEME[h.type] }}>{h.priority === "GOD" && "👑 "}{h.name}</span></Tooltip>)}
                                            </div>
                                        );
                                    }) : ["P", "G", "S"].map(type => {
                                        const list = hero.hex.filter(h => h.type === type);
                                        if (list.length === 0) return null;
                                        return (
                                            <div key={type} style={{ marginBottom: '15px' }}>
                                                <div className="sub-label" style={{ color: THEME[type] }}>{type === "P" ? "紫色棱彩" : type === "G" ? "黄金海克斯" : "白银海克斯"}</div>
                                                {list.map(h => <Tooltip key={h.name} title={h.name} type={h.type}><span className="hex-badge" style={{ background: THEME[h.type] }}>{h.name}</span></Tooltip>)}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
    </script>
</body>
</html>
