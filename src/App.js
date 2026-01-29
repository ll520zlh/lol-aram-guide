import React, { useState } from "react";

// --- 1. 图标映射表 (全量 OP.GG 链接) ---
const IMAGE_MAP = {
  // 英雄头像
  "火人": "https://opgg-static.akamaized.net/meta/images/lol/16.2.1/champion/Brand.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto:good,f_webp,w_160,h_160&v=1602",
  "杰斯": "https://opgg-static.akamaized.net/meta/images/lol/16.2.1/champion/Jayce.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto:good,f_webp,w_160,h_160&v=1602",
  "阿狸": "https://opgg-static.akamaized.net/meta/images/lol/16.2.1/champion/Ahri.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto:good,f_webp,w_160,h_160&v=1602",
  "拉克丝": "https://opgg-static.akamaized.net/meta/images/lol/16.2.1/champion/Lux.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto:good,f_webp,w_160,h_160&v=1602",
  "莫甘娜": "https://opgg-static.akamaized.net/meta/images/lol/16.2.1/champion/Morgana.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto:good,f_webp,w_160,h_160&v=1602",
  "泽拉斯": "https://opgg-static.akamaized.net/meta/images/lol/16.2.1/champion/Xerath.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto:good,f_webp,w_160,h_160&v=1602",
  "婕拉": "https://opgg-static.akamaized.net/meta/images/lol/16.2.1/champion/Zyra.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto:good,f_webp,w_160,h_160&v=1602",
  "大眼": "https://opgg-static.akamaized.net/meta/images/lol/16.2.1/champion/Velkoz.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto:good,f_webp,w_160,h_160&v=1602",
  "安妮": "https://opgg-static.akamaized.net/meta/images/lol/16.2.1/champion/Annie.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto:good,f_webp,w_160,h_160&v=1602",
  "兔子": "https://opgg-static.akamaized.net/meta/images/lol/16.2.1/champion/Aurora.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto:good,f_webp,w_160,h_160&v=1602",
  "吉格斯": "https://opgg-static.akamaized.net/meta/images/lol/16.2.1/champion/Ziggs.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto:good,f_webp,w_160,h_160&v=1602",
  "龙王": "https://opgg-static.akamaized.net/meta/images/lol/16.2.1/champion/AurelionSol.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto:good,f_webp,w_160,h_160&v=1602",
  "萨勒芬妮": "https://opgg-static.akamaized.net/meta/images/lol/16.2.1/champion/Seraphine.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto:good,f_webp,w_160,h_160&v=1602",
  "梅尔": "https://opgg-static.akamaized.net/meta/images/lol/16.2.1/champion/Mel.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto:good,f_webp,w_160,h_160&v=1602",
  "烬": "https://opgg-static.akamaized.net/meta/images/lol/16.2.1/champion/Jhin.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto:good,f_webp,w_160,h_160&v=1602",
  "金克斯": "https://opgg-static.akamaized.net/meta/images/lol/16.2.1/champion/Jinx.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto:good,f_webp,w_160,h_160&v=1602",
  "女警": "https://opgg-static.akamaized.net/meta/images/lol/16.2.1/champion/Caitlyn.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto:good,f_webp,w_160,h_160&v=1602",
  "小炮": "https://opgg-static.akamaized.net/meta/images/lol/16.2.1/champion/Tristana.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto:good,f_webp,w_160,h_160&v=1602",
  "EZ": "https://opgg-static.akamaized.net/meta/images/lol/16.2.1/champion/Ezreal.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto:good,f_webp,w_160,h_160&v=1602",
  "维鲁斯": "https://opgg-static.akamaized.net/meta/images/lol/16.2.1/champion/Varus.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto:good,f_webp,w_160,h_160&v=1602",
  "小火龙": "https://opgg-static.akamaized.net/meta/images/lol/16.2.1/champion/Smolder.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto:good,f_webp,w_160,h_160&v=1602",
  "卡莎": "https://opgg-static.akamaized.net/meta/images/lol/16.2.1/champion/Kaisa.png?image=c_crop,h_103,w_103,x_9,y_9/q_auto:good,f_webp,w_160,h_160&v=1602",

  // 装备
  "女神泪": "https://opgg-static.akamaized.net/meta/images/lol/16.2.1/item/3070.png?image=q_auto:good,f_webp,w_64,h_64&v=1602",
  "命定灰烬": "https://opgg-static.akamaized.net/meta/images/lol/16.2.1/item/2508.png?image=q_auto:good,f_webp,w_64,h_64&v=1602",

  // 海克斯图片 (棱彩/黄金/白银)
  "巨人杀手": "https://opgg-static.akamaized.net/meta/images/lol/latest/aram-augment/GiantSlayer_large.png?image=q_auto:good,f_webp,w_120&v=1769499572",
  "珠光护手": "https://opgg-static.akamaized.net/meta/images/lol/latest/aram-augment/JeweledGauntlet_large.png?image=q_auto:good,f_webp,w_120&v=1769499572",
  "尤里卡": "https://opgg-static.akamaized.net/meta/images/lol/latest/aram-augment/Eureka_large.png?image=q_auto:good,f_webp,w_120&v=1769499572",
  "炼狱导管": "https://opgg-static.akamaized.net/meta/images/lol/latest/aram-augment/InfernalConduit_large.png?image=q_auto:good,f_webp,w_120&v=1769499572",
  "魔法飞弹": "https://opgg-static.akamaized.net/meta/images/lol/latest/aram-augment/MagicMissile_large.Kiwi.png?image=q_auto:good,f_webp,w_120&v=1769499572",
  "裁决使": "https://opgg-static.akamaized.net/meta/images/lol/latest/aram-augment/SpiritualPurification_large.png?image=q_auto:good,f_webp,w_120&v=1769499572",
  "易损": "https://opgg-static.akamaized.net/meta/images/lol/latest/aram-augment/Vulnerability_large.png?image=q_auto:good,f_webp,w_64,h_64&v=1602",
  "有始有终": "https://opgg-static.akamaized.net/meta/images/lol/latest/aram-augment/FromBeginningToEnd_large.png?image=q_auto:good,f_webp,w_64,h_64&v=1602",
  "一板一眼": "https://opgg-static.akamaized.net/meta/images/lol/latest/aram-augment/SlowAndSteady_large.png?image=q_auto:good,f_webp,w_64,h_64&v=1602",
  "老练狙神": "https://opgg-static.akamaized.net/meta/images/lol/latest/aram-augment/SkilledSniper_large.png?image=q_auto:good,f_webp,w_64,h_64&v=1602",
  "魔法转物理": "https://opgg-static.akamaized.net/meta/images/lol/latest/aram-augment/Escapade_large.png?image=q_auto:good,f_webp,w_64,h_64&v=1602",
  "往复循环": "https://opgg-static.akamaized.net/meta/images/lol/latest/aram-augment/Recursion_large.png?image=q_auto:good,f_webp,w_64,h_64&v=1602",
  "升级狂妄": "https://opgg-static.akamaized.net/meta/images/lol/latest/aram-augment/UpgradeHubris_large.png?image=q_auto:good,f_webp,w_64,h_64&v=1602",
  "杀戮时间到了": "https://opgg-static.akamaized.net/meta/images/lol/latest/aram-augment/ItsKillingTime_large.png?image=q_auto:good,f_webp,w_64,h_64&v=1602",
  "仆从大师": "https://opgg-static.akamaized.net/meta/images/lol/latest/aram-augment/Minionmancer_large.png?image=q_auto:good,f_webp,w_64,h_64&v=1602",
  "巫师思考": "https://opgg-static.akamaized.net/meta/images/lol/latest/aram-augment/WitchfulThinking_large.png?image=q_auto:good,f_webp,w_64,h_64&v=1602",
  "物理转魔法": "https://opgg-static.akamaized.net/meta/images/lol/latest/aram-augment/ADAPt_large.png?image=q_auto:good,f_webp,w_64,h_64&v=1602",
  "帽上加帽": "https://opgg-static.akamaized.net/meta/images/lol/latest/aram-augment/HatonaHat_large.png?image=q_auto:good,f_webp,w_64,h_64&v=1602",
  "暗影疾奔": "https://raw.communitydragon.org/latest/game/assets/ux/traiticons/trait_icon_shadowdash.png",
  "冰寒": "https://opgg-static.akamaized.net/meta/images/lol/latest/aram-augment/IceCold_large.png?image=q_auto:good,f_webp,w_64,h_64&v=1602",

  "default": "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/item-icons/3157.png",
};

const THEME = { P: "#a855f7", G: "#f59e0b", S: "#94a3b8", GOD: "#ffd700" };

// --- 2. 英雄数据库 (全量补全 14位英雄) ---
const HEROES_DATA = [
  { 
    id: 1, name: "火人", reason: "AOE及灼烧伤害，输出简单。", 
    startItems: ["女神泪", "命定灰烬"], finalItems: ["兰德里的折磨", "女神泪", "影焰", "大帽", "法穿棒"],
    usePriority: true,
    hex: [
      { name: "炼狱导管", type: "P", priority: "GOD" },
      { name: "易损", type: "G", priority: "S" }, { name: "尤里卡", type: "P", priority: "S" }, { name: "巨人杀手", type: "P", priority: "S" }, { name: "魔法飞弹", type: "G", priority: "S" },
      { name: "珠光护手", type: "P", priority: "Other" }, { name: "裁决使", type: "G", priority: "Other" }, { name: "有始有终", type: "G", priority: "Other" }, { name: "巫师思考", type: "S", priority: "Other" }, { name: "帽上加帽", type: "S", priority: "Other" }, { name: "物理转魔法", type: "S", priority: "Other" }
    ]
  },
  { 
    id: 2, name: "杰斯", reason: "手长，爆发。", usePriority: true,
    hex: [
      { name: "一板一眼", type: "G", priority: "GOD" },
      { name: "珠光护手", type: "P", priority: "S" }, { name: "巨人杀手", type: "P", priority: "S" }, { name: "老练狙神", type: "G", priority: "S" },
      { name: "裁决使", type: "G", priority: "Other" }, { name: "升级狂妄", type: "G", priority: "Other" }, { name: "魔法转物理", type: "S", priority: "Other" }
    ]
  },
  { id: 3, name: "阿狸", reason: "多段位移，控制稳。", hex: [{ name: "尤里卡", type: "P" }, { name: "巨人杀手", type: "P" }, { name: "珠光护手", type: "P" }, { name: "魔法飞弹", type: "G" }, { name: "裁决使", type: "G" }, { name: "往复循环", type: "G" }, { name: "有始有终", type: "G" }, { name: "巫师思考", type: "S" }, { name: "帽上加帽", type: "S" }, { name: "物理转魔法", type: "S" }] },
  { id: 4, name: "拉克丝", reason: "手长有控制。", hex: [{ name: "尤里卡", type: "P" }, { name: "巨人杀手", type: "P" }, { name: "珠光护手", type: "P" }, { name: "魔法飞弹", type: "G" }, { name: "裁决使", type: "G" }, { name: "往复循环", type: "G" }, { name: "老练狙神", type: "G" }, { name: "有始有终", type: "G" }, { name: "巫师思考", type: "S" }, { name: "帽上加帽", type: "S" }, { name: "物理转魔法", type: "S" }] },
  { id: 5, name: "莫甘娜", reason: "免控及控制强。", hex: [{ name: "尤里卡", type: "P" }, { name: "巨人杀手", type: "P" }, { name: "珠光护手", type: "P" }, { name: "魔法飞弹", type: "G" }, { name: "裁决使", type: "G" }, { name: "往复循环", type: "G" }, { name: "老练狙神", type: "G" }, { name: "有始有终", type: "G" }] },
  { id: 6, name: "泽拉斯", reason: "极致远射。", hex: [{ name: "尤里卡", type: "P" }, { name: "巨人杀手", type: "P" }, { name: "珠光护手", type: "P" }, { name: "魔法飞弹", type: "G" }, { name: "裁决使", type: "G" }, { name: "往复循环", type: "G" }, { name: "老练狙神", type: "G" }, { name: "有始有终", type: "G" }] },
  { id: 7, name: "婕拉", reason: "阵地控制及消耗。", hex: [{ name: "尤里卡", type: "P" }, { name: "巨人杀手", type: "P" }, { name: "珠光护手", type: "P" }, { name: "魔法飞弹", type: "G" }, { name: "裁决使", type: "G" }, { name: "往复循环", type: "G" }, { name: "仆从大师", type: "G" }, { name: "老练狙神", type: "G" }, { name: "有始有终", type: "G" }] },
  { id: 8, name: "大眼", reason: "真伤及远程爆发。", hex: [{ name: "尤里卡", type: "P" }, { name: "巨人杀手", type: "P" }, { name: "珠光护手", type: "P" }, { name: "魔法飞弹", type: "G" }, { name: "裁决使", type: "G" }, { name: "往复循环", type: "G" }, { name: "仆从大师", type: "G" }, { name: "老练狙神", type: "G" }, { name: "有始有终", type: "G" }] },
  { id: 9, name: "安妮", reason: "瞬间开团控制。", hex: [{ name: "尤里卡", type: "P" }, { name: "巨人杀手", type: "P" }, { name: "珠光护手", type: "P" }, { name: "魔法飞弹", type: "G" }, { name: "裁决使", type: "G" }, { name: "往复循环", type: "G" }, { name: "仆从大师", type: "G" }, { name: "杀戮时间到了", type: "G" }, { name: "有始有终", type: "G" }] },
  { id: 10, name: "兔子", reason: "隐身切入爆发。", hex: [{ name: "尤里卡", type: "P" }, { name: "珠光护手", type: "P" }, { name: "巨人杀手", type: "P" }, { name: "魔法飞弹", type: "G" }, { name: "裁决使", type: "G" }, { name: "往复循环", type: "G" }, { name: "杀戮时间到了", type: "G" }, { name: "有始有终", type: "G" }, { name: "暗影疾奔", type: "S" }] },
  { id: 11, name: "吉格斯", reason: "推塔及远程消耗。", hex: [{ name: "尤里卡", type: "P" }, { name: "珠光护手", type: "P" }, { name: "巨人杀手", type: "P" }, { name: "魔法飞弹", type: "G" }, { name: "裁决使", type: "G" }, { name: "老练狙神", type: "G" }, { name: "往复循环", type: "G" }, { name: "有始有终", type: "G" }] },
  { id: 12, name: "龙王", reason: "后期超大范围AOE。", hex: [{ name: "尤里卡", type: "P" }, { name: "珠光护手", type: "P" }, { name: "巨人杀手", type: "P" }, { name: "魔法飞弹", type: "G" }, { name: "往复循环", type: "G" }, { name: "有始有终", type: "G" }, { name: "冰寒", type: "S" }] },
  { id: 13, name: "萨勒芬妮", reason: "群体护盾团控。", hex: [{ name: "尤里卡", type: "P" }, { name: "珠光护手", type: "P" }, { name: "巨人杀手", type: "P" }, { name: "魔法飞弹", type: "G" }, { name: "往复循环", type: "G" }, { name: "裁决使", type: "G" }, { name: "老练狙神", type: "G" }, { name: "有始有终", type: "G" }] },
  { id: 14, name: "梅尔", reason: "强力新英雄控制。", hex: [{ name: "尤里卡", type: "P" }, { name: "珠光护手", type: "P" }, { name: "巨人杀手", type: "P" }, { name: "魔法飞弹", type: "G" }, { name: "往复循环", type: "G" }, { name: "裁决使", type: "G" }, { name: "老练狙神", type: "G" }, { name: "有始有终", type: "G" }] }
];

const MARKSMEN = ["烬", "金克斯", "女警", "小炮", "EZ", "维鲁斯", "小火龙", "卡莎"];

// --- 3. 悬浮及 UI 组件 ---
const Tooltip = ({ title, type, priority, children }) => {
  const [visible, setVisible] = useState(false);
  const imgUrl = IMAGE_MAP[title] || IMAGE_MAP["default"];
  const isGod = priority === "GOD";

  return (
    <div style={{ position: "relative", display: "inline-block" }} onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
      {children}
      {visible && (
        <div style={styles.tooltipBox}>
          <div style={{ ...styles.imageWrapper, border: isGod ? `2px solid ${THEME.GOD}` : `1px solid ${THEME[type] || '#333'}` }}>
            <img src={imgUrl} alt={title} style={styles.tooltipImg} />
          </div>
          <div style={{ fontSize: "11px", fontWeight: "bold", color: isGod ? THEME.GOD : "#fff", marginTop: "6px" }}>
            {isGod && "👑 "}{title}
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={{ color: "#2563eb", margin: 0, fontSize: "36px" }}>ARAM.GG 攻略板</h1>
        <p style={{ color: "#64748b", marginTop: "8px" }}>👑神级核心 {">"} 🔥S级强势 {">"} ✅备选参考</p>
      </header>

      <div style={styles.grid}>
        {HEROES_DATA.map((hero) => (
          <div key={hero.id} style={styles.card}>
            <div style={styles.heroHeader}>
              <img src={IMAGE_MAP[hero.name]} alt={hero.name} style={styles.heroAvatar} />
              <div>
                <h3 style={{ margin: 0, fontSize: "20px" }}>{hero.name}</h3>
                <p style={{ fontSize: "11px", color: "#64748b", marginTop: "4px" }}>优势：{hero.reason}</p>
              </div>
            </div>

            {/* 装备区 */}
            {hero.startItems && (
              <div style={styles.itemContainer}>
                <div style={{ marginBottom: "12px" }}>
                  <div style={styles.subLabel}>☀️ 出门装</div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    {hero.startItems.map(i => <Tooltip key={i} title={i} type="S"><span style={styles.itemBadge}>{i}</span></Tooltip>)}
                  </div>
                </div>
                <div>
                  <div style={styles.subLabel}>🏆 神装参考</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {hero.finalItems.map(i => <Tooltip key={i} title={i} type="G"><span style={styles.itemBadgePrimary}>{i}</span></Tooltip>)}
                  </div>
                </div>
              </div>
            )}

            {/* 海克斯展示逻辑 */}
            <div style={styles.hexSection}>
              {hero.usePriority ? (
                // 火人/杰斯：按优先级排列
                ["GOD", "S", "Other"].map(pri => {
                  const list = hero.hex.filter(h => h.priority === pri);
                  if (list.length === 0) return null;
                  return (
                    <div key={pri} style={{ marginBottom: "10px" }}>
                      <div style={{ ...styles.subLabel, color: pri === "GOD" ? THEME.GOD : "#94a3b8" }}>{pri === "GOD" ? "👑 神级核心" : pri === "S" ? "🔥 S级强势" : "✅ 备选"}</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {list.map(h => (
                          <Tooltip key={h.name} title={h.name} type={h.type} priority={h.priority}>
                            <span className={h.priority === "GOD" ? "god-badge" : ""} style={{ ...styles.badgeBase, background: THEME[h.type] }}>{h.priority === "GOD" && "👑 "}{h.name}</span>
                          </Tooltip>
                        ))}
                      </div>
                    </div>
                  );
                })
              ) : (
                // 其他英雄：按颜色等级排列
                ["P", "G", "S"].map(type => {
                  const list = hero.hex.filter(h => h.type === type);
                  if (list.length === 0) return null;
                  return (
                    <div key={type} style={{ marginBottom: "10px" }}>
                      <div style={{ ...styles.subLabel, color: THEME[type] }}>{type === "P" ? "紫色棱彩" : type === "G" ? "黄金海克斯" : "白银海克斯"}</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                        {list.map(h => <Tooltip key={h.name} title={h.name} type={h.type}><span style={{ ...styles.badgeBase, background: THEME[h.type] }}>{h.name}</span></Tooltip>)}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        ))}
      </div>

      <h2 style={styles.sectionTitle}>强势射手一览</h2>
      <div style={{ ...styles.card, display: "flex", flexWrap: "wrap", gap: "12px" }}>
        {MARKSMEN.map(name => (
          <div key={name} style={styles.marksmanBtn}><img src={IMAGE_MAP[name]} style={{ width: "26px", height: "26px", borderRadius: "50%", marginRight: "8px" }} alt="" />{name}</div>
        ))}
      </div>

      <style>{`
        @keyframes glow { 0% { box-shadow: 0 0 5px #ffd700; } 50% { box-shadow: 0 0 15px #ffd700; } 100% { box-shadow: 0 0 5px #ffd700; } }
        .god-badge { animation: glow 2s infinite ease-in-out; border: 1.5px solid #ffd700 !important; }
      `}</style>
    </div>
  );
}

const styles = {
  container: { backgroundColor: "#f8fafc", minHeight: "100vh", padding: "40px 20px", fontFamily: "sans-serif" },
  header: { textAlign: "center", marginBottom: "40px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(330px, 1fr))", gap: "24px", maxWidth: "1400px", margin: "0 auto" },
  card: { backgroundColor: "white", borderRadius: "24px", padding: "24px", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column" },
  heroHeader: { display: "flex", alignItems: "center", gap: "15px", marginBottom: "20px", borderBottom: "1px solid #f1f5f9", paddingBottom: "15px" },
  heroAvatar: { width: "60px", height: "60px", borderRadius: "14px", border: "2px solid #e2e8f0" },
  subLabel: { fontSize: "10px", fontWeight: "900", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: "6px" },
  itemContainer: { backgroundColor: "#f1f5f9", padding: "16px", borderRadius: "16px", marginBottom: "15px" },
  itemBadge: { background: "#fff", color: "#475569", padding: "4px 10px", borderRadius: "6px", fontSize: "11px", border: "1px solid #e2e8f0", cursor: "help" },
  itemBadgePrimary: { background: "#2563eb", color: "#fff", padding: "4px 10px", borderRadius: "6px", fontSize: "11px", cursor: "help" },
  badgeBase: { color: "white", padding: "5px 12px", borderRadius: "10px", fontSize: "12px", fontWeight: "bold", cursor: "help", display: "inline-block" },
  tooltipBox: { position: "absolute", bottom: "140%", left: "50%", transform: "translateX(-50%)", backgroundColor: "#000", padding: "12px", borderRadius: "18px", zIndex: 100, width: "110px", textAlign: "center", boxShadow: "0 10px 30px rgba(0,0,0,0.6)" },
  imageWrapper: { backgroundColor: "#111", borderRadius: "12px", padding: "4px", marginBottom: "8px", display: "flex", justifyContent: "center" },
  tooltipImg: { width: "80px", height: "80px", borderRadius: "8px", display: "block" },
  marksmanBtn: { display: "flex", alignItems: "center", padding: "12px 18px", backgroundColor: "#fff", border: "1px solid #fed7aa", borderRadius: "12px", color: "#ea580c", fontWeight: "bold" },
  sectionTitle: { borderLeft: "6px solid #2563eb", paddingLeft: "16px", fontSize: "24px", fontWeight: "bold", margin: "40px auto 24px", maxWidth: "1400px" }
};
