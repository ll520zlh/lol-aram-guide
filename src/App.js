import React, { useState } from "react";

const IMAGE_MAP = {
    "火人": "https://opgg-static.akamaized.net/meta/images/lol/16.2.1/champion/Brand.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto:good,f_webp,w_160,h_160&v=1602",
    "杰斯": "https://opgg-static.akamaized.net/meta/images/lol/16.2.1/champion/Jayce.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto:good,f_webp,w_160,h_160&v=1602",
    "阿狸": "https://opgg-static.akamaized.net/meta/images/lol/16.2.1/champion/Ahri.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto:good,f_webp,w_160,h_160&v=1602",
    "拉克丝": "https://opgg-static.akamaized.net/meta/images/lol/16.2.1/champion/Lux.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto:good,f_webp,w_160,h_160&v=1602",
    "大眼": "https://opgg-static.akamaized.net/meta/images/lol/16.2.1/champion/Velkoz.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto:good,f_webp,w_160,h_160&v=1602",
    "女神泪": "https://opgg-static.akamaized.net/meta/images/lol/16.2.1/item/3070.png?image=q_auto:good,f_webp,w_64,h_64&v=1602",
    "命定灰烬": "https://opgg-static.akamaized.net/meta/images/lol/16.2.1/item/2508.png?image=q_auto:good,f_webp,w_64,h_64&v=1602"
};

const THEME = { P: "#a855f7", G: "#f59e0b", S: "#94a3b8", GOD: "#ffd700" };

const Tooltip = ({ title, type, priority, children }) => {
  const [visible, setVisible] = useState(false);
  const imgUrl = IMAGE_MAP[title] || "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/item-icons/3157.png";
  return (
    <div style={{ position: "relative", display: "inline-block" }} onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
      {children}
      {visible && (
        <div style={{ position: "absolute", bottom: "140%", left: "50%", transform: "translateX(-50%)", backgroundColor: "#000", padding: "12px", borderRadius: "18px", zIndex: 100, width: "110px", textAlign: "center", boxShadow: "0 10px 30px rgba(0,0,0,0.6)", border: priority === "GOD" ? `2px solid ${THEME.GOD}` : `1px solid ${THEME[type] || "#333"}` }}>
          <div style={{ backgroundColor: "#111", borderRadius: "12px", padding: "4px", marginBottom: "8px" }}><img src={imgUrl} style={{ width: "80px", height: "80px", borderRadius: "8px" }} /></div>
          <div style={{ fontSize: "11px", fontWeight: "bold", color: priority === "GOD" ? THEME.GOD : "#fff" }}>{priority === "GOD" && "👑 "}{title}</div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const heroes = [
    { id: 1, name: "火人", reason: "AOE及灼烧伤害，输出简单。", startItems: ["女神泪", "命定灰烬"], finalItems: ["兰德里的折磨", "女神泪", "影焰", "大帽", "法穿棒"], usePriority: true, hex: [{ name: "炼狱导管", type: "P", priority: "GOD" }, { name: "易损", type: "G", priority: "S" }, { name: "尤里卡", type: "P", priority: "S" }] },
    { id: 2, name: "杰斯", reason: "强力远程爆发。", usePriority: true, hex: [{ name: "一板一眼", type: "G", priority: "GOD" }, { name: "珠光护手", type: "P", priority: "S" }, { name: "魔法转物理", type: "S", priority: "Other" }] },
    { id: 3, name: "阿狸", reason: "多段位移控制稳。", hex: [{ name: "尤里卡", type: "P" }, { name: "巨人杀手", type: "P" }, { name: "魔法飞弹", type: "G" }] }
  ];

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh", padding: "40px 20px", fontFamily: "sans-serif" }}>
      <header style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ color: "#2563eb", margin: 0, fontSize: "36px" }}>ARAM.GG 攻略板</h1>
        <p style={{ color: "#64748b" }}>👑神级核心 > 🔥S级强势 > ✅备选参考</p>
      </header>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(330px, 1fr))", gap: "24px", maxWidth: "1400px", margin: "0 auto" }}>
        {heroes.map(hero => (
          <div key={hero.id} style={{ backgroundColor: "white", borderRadius: "24px", padding: "24px", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "20px", borderBottom: "1px solid #f1f5f9", paddingBottom: "15px" }}>
              <img src={IMAGE_MAP[hero.name]} style={{ width: "60px", height: "60px", borderRadius: "14px", border: "2px solid #e2e8f0" }} />
              <div><h3 style={{ margin: 0 }}>{hero.name}</h3><p style={{ fontSize: '11px', color: '#64748b' }}>{hero.reason}</p></div>
            </div>
            {hero.startItems && (
              <div style={{ backgroundColor: "#f1f5f9", padding: "16px", borderRadius: "16px", marginBottom: "15px" }}>
                <div style={{ marginBottom: "10px" }}><div style={{ fontSize: "10px", fontWeight: "900", color: "#94a3b8" }}>☀️ 出门装</div>{hero.startItems.map(i => <Tooltip key={i} title={i} type="S"><span style={{ background: "#fff", padding: "4px 8px", borderRadius: "6px", fontSize: "11px", border: "1px solid #e2e8f0", marginRight: "5px" }}>{i}</span></Tooltip>)}</div>
                <div><div style={{ fontSize: "10px", fontWeight: "900", color: "#94a3b8" }}>🏆 神装参考</div>{hero.finalItems.map(i => <Tooltip key={i} title={i} type="G"><span style={{ background: "#2563eb", color: "#fff", padding: "4px 8px", borderRadius: "6px", fontSize: "11px", marginRight: "5px" }}>{i}</span></Tooltip>)}</div>
              </div>
            )}
            {["GOD", "S", "Other"].map(pri => {
              const list = hero.hex.filter(h => h.priority === pri);
              return list.length > 0 && (
                <div key={pri} style={{ marginBottom: "10px" }}>
                  <div style={{ fontSize: "10px", fontWeight: "900", color: pri === "GOD" ? THEME.GOD : "#64748b" }}>{pri === "GOD" ? "👑 神级核心" : "🔥 推荐选项"}</div>
                  {list.map(h => (
                    <Tooltip key={h.name} title={h.name} type={h.type} priority={h.priority}>
                      <span style={{ backgroundColor: THEME[h.type], color: "white", padding: "5px 12px", borderRadius: "10px", fontSize: "12px", fontWeight: "bold", marginRight: "5px", display: "inline-block", marginTop: "5px", border: h.priority === "GOD" ? `1.5px solid ${THEME.GOD}` : "none" }}>{h.priority === "GOD" && "👑 "}{h.name}</span>
                    </Tooltip>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
