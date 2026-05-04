import { useState } from "react";
import styled, { keyframes } from "styled-components";

const menu = [
  {
    group: null,
    items: [
      { key: "dashboard", icon: "⊞", label: "Dashboard" },
    ],
  },
  {
    group: "Master Data",
    items: [
      { key: "master-user",     icon: "👤", label: "Master User" },
      { key: "master-role",     icon: "🔑", label: "Master Role" },
      { key: "master-branch",   icon: "🏢", label: "Master Branch" },
      { key: "master-currency", icon: "💱", label: "Master Currency" },
    ],
  },
  {
    group: "Operations",
    items: [
      { key: "single-overbooking", icon: "📒", label: "Single Overbooking" },
      { key: "accounts",           icon: "🏦", label: "Accounts" },
      { key: "transactions",       icon: "↔",  label: "Transactions" },
      { key: "transfer",           icon: "↗",  label: "Transfer" },
      { key: "payments",           icon: "💳", label: "Payments" },
    ],
  },
  {
    group: "Workflow",
    items: [
      { key: "workflow-inbox",   icon: "📥", label: "Inbox" },
      { key: "workflow-pending", icon: "⏳", label: "Pending Approval" },
      { key: "workflow-history", icon: "📋", label: "History" },
    ],
  },
  {
    group: "System",
    items: [
      { key: "reports",  icon: "📊", label: "Reports" },
      { key: "settings", icon: "⚙",  label: "Settings" },
    ],
  },
];

/* ── Glow orb behind active item ── */
const pulseGlow = keyframes`
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50%       { opacity: 0.7; transform: scale(1.15); }
`;

const SidebarWrapper = styled.aside`
  position: fixed;
  top: 64px;
  left: 0;
  height: calc(100vh - 64px);
  width: ${({ collapsed }) => (collapsed ? "68px" : "228px")};
  display: flex;
  flex-direction: column;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 100;
  overflow: hidden;

  backdrop-filter: blur(24px) saturate(200%);
  -webkit-backdrop-filter: blur(24px) saturate(200%);
  background: ${({ theme }) =>
    theme.mode === "light"
      ? "rgba(240,242,244,0.88)"
      : "linear-gradient(160deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)"};
  border-right: 1px solid ${({ theme }) =>
    theme.mode === "light"
      ? "rgba(0,0,0,0.07)"
      : "rgba(255,255,255,0.09)"};
  box-shadow: ${({ theme }) =>
    theme.mode === "light"
      ? "6px 0 32px rgba(0,0,0,0.08), inset 1px 0 0 rgba(255,255,255,0.9)"
      : "6px 0 32px rgba(0,0,0,0.35), inset 1px 0 0 rgba(255,255,255,0.06)"};
`;

/* decorative gradient orb at top */
const GlowOrb = styled.div`
  position: absolute;
  top: -60px;
  left: -40px;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(78, 204, 163, 0.18) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  animation: ${pulseGlow} 4s ease-in-out infinite;
`;

const GlowOrbBottom = styled.div`
  position: absolute;
  bottom: -80px;
  right: -60px;
  width: 220px;
  height: 220px;
  background: radial-gradient(circle, rgba(100, 120, 255, 0.12) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  animation: ${pulseGlow} 5s ease-in-out infinite reverse;
`;

/* thin top highlight line (macOS window style) */
const TopHighlight = styled.div`
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.2) 40%,
    rgba(255, 255, 255, 0.1) 100%
  );
  flex-shrink: 0;
`;

const CollapseBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: ${({ collapsed }) => (collapsed ? "center" : "flex-end")};
  padding: 10px 16px;
  background: none;
  border: none;
  border-bottom: 1px solid ${({ theme }) =>
    theme.mode === "light" ? "rgba(0,0,0,0.07)" : "rgba(255,255,255,0.06)"};
  color: ${({ theme }) =>
    theme.mode === "light" ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.3)"};
  cursor: pointer;
  font-size: 14px;
  transition: color 0.2s, background 0.2s;
  flex-shrink: 0;
  z-index: 1;

  &:hover {
    color: #4ecca3;
    background: rgba(78, 204, 163, 0.06);
  }
`;

const Nav = styled.nav`
  flex: 1;
  padding: 8px 0 16px;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1;

  &::-webkit-scrollbar { width: 0; }
`;

const FixedTooltip = styled.div`
  position: fixed;
  left: 76px;
  top: ${({ y }) => y}px;
  transform: translateY(-50%);

  /* glassmorphism */
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  background: ${({ theme }) =>
    theme.mode === "light"
      ? "rgba(30, 40, 60, 0.75)"
      : "rgba(255, 255, 255, 0.12)"};
  border: 1px solid ${({ theme }) =>
    theme.mode === "light"
      ? "rgba(255,255,255,0.25)"
      : "rgba(255, 255, 255, 0.22)"};
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.25);

  color: #fff;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  padding: 6px 12px;
  border-radius: 9px;
  pointer-events: none;
  z-index: 9999;
  letter-spacing: 0.2px;

  &::before {
    content: "";
    position: absolute;
    right: 100%;
    top: 50%;
    transform: translateY(-50%);
    border: 5px solid transparent;
    border-right-color: rgba(255, 255, 255, 0.18);
  }
`;

const NavItem = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  width: calc(100% - 16px);
  margin: 2px 8px;
  padding: 9px 12px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: left;
  white-space: nowrap;
  color: ${({ active, theme }) =>
    active
      ? theme.mode === "light" ? "#1a1a2e" : "#ffffff"
      : theme.mode === "light" ? "rgba(0,0,0,0.85)" : "rgba(255,255,255,0.88)"};

  background: ${({ active, theme }) =>
    active
      ? theme.mode === "light"
        ? "rgba(78,204,163,0.18)"
        : "linear-gradient(135deg, rgba(78,204,163,0.3) 0%, rgba(78,204,163,0.15) 100%)"
      : "transparent"};

  backdrop-filter: ${({ active }) => (active ? "blur(12px)" : "none")};
  -webkit-backdrop-filter: ${({ active }) => (active ? "blur(12px)" : "none")};

  border: 1px solid ${({ active, theme }) =>
    active
      ? theme.mode === "light" ? "rgba(78,204,163,0.4)" : "rgba(78,204,163,0.35)"
      : "transparent"};

  box-shadow: ${({ active }) =>
    active
      ? "0 4px 16px rgba(78,204,163,0.2), inset 0 1px 0 rgba(255,255,255,0.15)"
      : "none"};

  &:hover {
    background: ${({ theme }) =>
      theme.mode === "light"
        ? "rgba(78,204,163,0.08)"
        : "rgba(255,255,255,0.07)"};
    color: ${({ theme }) =>
      theme.mode === "light" ? "#1a1a2e" : "rgba(255,255,255,0.9)"};
    border-color: ${({ theme }) =>
      theme.mode === "light" ? "rgba(78,204,163,0.3)" : "rgba(255,255,255,0.1)"};
    transform: translateX(2px);
  }

  &:active {
    transform: translateX(1px) scale(0.98);
  }
`;

/* green dot indicator for active */
const ActiveDot = styled.span`
  position: absolute;
  right: 10px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #4ecca3;
  box-shadow: 0 0 6px rgba(78, 204, 163, 0.8);
  opacity: ${({ active }) => (active ? 1 : 0)};
  transition: opacity 0.2s;
`;

const Icon = styled.span`
  font-size: 16px;
  min-width: 22px;
  text-align: center;
  flex-shrink: 0;
  filter: brightness(1.2) saturate(1.4);
  transition: filter 0.2s;
`;

const Label = styled.span`
  font-size: 13px;
  font-weight: ${({ active }) => (active ? "600" : "500")};
  opacity: ${({ collapsed }) => (collapsed ? 0 : 1)};
  transition: opacity 0.2s;
  pointer-events: none;
  letter-spacing: 0.1px;
`;

const Divider = styled.div`
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 8px,
    ${({ theme }) =>
      theme.mode === "light"
        ? "rgba(0,0,0,0.07)"
        : "rgba(255,255,255,0.07)"} 8px,
    ${({ theme }) =>
      theme.mode === "light"
        ? "rgba(0,0,0,0.07)"
        : "rgba(255,255,255,0.07)"} calc(100% - 8px),
    transparent calc(100% - 8px)
  );
  margin: 6px 0;
  z-index: 1;
`;

const GroupLabel = styled.p`
  font-size: 9px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: ${({ theme }) =>
    theme.mode === "light" ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.55)"};
  padding: ${({ collapsed }) => (collapsed ? "12px 0 4px" : "12px 20px 4px")};
  text-align: ${({ collapsed }) => (collapsed ? "center" : "left")};
  white-space: nowrap;
  overflow: hidden;
  opacity: ${({ collapsed }) => (collapsed ? 0 : 1)};
  max-height: ${({ collapsed }) => (collapsed ? "0" : "32px")};
  transition: opacity 0.2s, max-height 0.2s;
  z-index: 1;
`;

const Sidebar = ({ activeKey, onSelect, onCollapse }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [tooltip, setTooltip] = useState(null); // { label, y }

  const toggle = () => {
    const next = !collapsed;
    setCollapsed(next);
    setTooltip(null);
    onCollapse && onCollapse(next);
  };

  const handleEnter = (e, label) => {
    if (!collapsed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({ label, y: rect.top + rect.height / 2 });
  };

  const handleLeave = () => setTooltip(null);

  return (
    <>
      <SidebarWrapper collapsed={collapsed}>
      <GlowOrb />
      <GlowOrbBottom />
      <TopHighlight />
      <CollapseBtn
        collapsed={collapsed}
        onClick={toggle}
        title={collapsed ? "Expand" : "Collapse"}
      >
        {collapsed ? "▶" : "◀"}
      </CollapseBtn>
      <Nav>
        {menu.map((section, sIdx) => (
          <div key={sIdx}>
            {sIdx > 0 && <Divider />}
            {section.group && (
              <GroupLabel collapsed={collapsed}>{section.group}</GroupLabel>
            )}
            {section.items.map((item) => {
              const isActive = activeKey === item.key;
              return (
                <NavItem
                  key={item.key}
                  active={isActive}
                  onClick={() => onSelect(item.key)}
                  onMouseEnter={(e) => handleEnter(e, item.label)}
                  onMouseLeave={handleLeave}
                >
                  <Icon active={isActive}>{item.icon}</Icon>
                  <Label collapsed={collapsed} active={isActive}>{item.label}</Label>
                  <ActiveDot active={isActive} />
                </NavItem>
              );
            })}
          </div>
        ))}
      </Nav>
    </SidebarWrapper>
    {tooltip && <FixedTooltip y={tooltip.y}>{tooltip.label}</FixedTooltip>}
    </>
  );
};

export default Sidebar;
