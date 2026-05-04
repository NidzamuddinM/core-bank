import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useThemeToggle } from "../context/ThemeToggleContext";

const roles = ["Admin", "Teller", "Supervisor", "Auditor", "Customer Service"];
const branches = [
  "HO — Head Office",
  "BR-001 — Jakarta Pusat",
  "BR-002 — Jakarta Selatan",
  "BR-003 — Bandung",
  "BR-004 — Surabaya",
  "BR-005 — Medan",
];

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 200;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  backdrop-filter: blur(28px) saturate(200%);
  -webkit-backdrop-filter: blur(28px) saturate(200%);
  background: ${({ theme }) =>
    theme.mode === "light"
      ? "rgba(255,255,255,0.65)"
      : "rgba(15,22,45,0.70)"};
  border-bottom: 1px solid rgba(78, 204, 163, 0.35);
  box-shadow: ${({ theme }) =>
    theme.mode === "light"
      ? "0 4px 32px rgba(0,0,0,0.08), 0 1px 0 rgba(78,204,163,0.2)"
      : "0 4px 32px rgba(0,0,0,0.35), 0 1px 0 rgba(78,204,163,0.15)"};
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;

  span {
    font-size: 20px;
    font-weight: 700;
    color: ${({ theme }) => theme.mode === "light" ? "#1a1a2e" : "#ffffff"};
    letter-spacing: -0.5px;
  }

  em {
    font-style: normal;
    color: #4ecca3;
  }
`;

const Badge = styled.span`
  background: #4ecca3;
  color: #1a1a2e;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 99px;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

/* ── Date Picker ── */
const DateWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${({ theme }) =>
    theme.mode === "light" ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.08)"};
  border: 1px solid rgba(78, 204, 163, 0.4);
  border-radius: 8px;
  padding: 6px 12px;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;

  &:hover {
    background: ${({ theme }) =>
      theme.mode === "light" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.14)"};
    border-color: rgba(78, 204, 163, 0.7);
  }
`;

const DateLabel = styled.span`
  font-size: 10px;
  color: ${({ theme }) =>
    theme.mode === "light" ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.45)"};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
`;

const DateInput = styled.input`
  background: transparent;
  border: none;
  outline: none;
  color: ${({ theme }) => theme.mode === "light" ? "#1a1a2e" : "#ffffff"};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  font-family: inherit;
  width: 120px;

  &::-webkit-calendar-picker-indicator {
    filter: ${({ theme }) =>
      theme.mode === "light" ? "opacity(0.5)" : "invert(1) opacity(0.5)"};
    cursor: pointer;
  }
`;

/* ── Dropdown ── */
const DropdownWrapper = styled.div`
  position: relative;
`;

const DropdownTrigger = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  background: ${({ theme }) =>
    theme.mode === "light" ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.08)"};
  border: 1px solid rgba(78, 204, 163, 0.4);
  border-radius: 8px;
  color: ${({ theme }) => theme.mode === "light" ? "#1a1a2e" : "#ffffff"};
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
  white-space: nowrap;

  &:hover {
    background: ${({ theme }) =>
      theme.mode === "light" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.16)"};
    border-color: rgba(78, 204, 163, 0.7);
  }

  &::after {
    content: "▾";
    font-size: 11px;
    color: ${({ theme }) =>
      theme.mode === "light" ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.5)"};
    margin-left: 2px;
  }
`;

const DropdownLabel = styled.span`
  font-size: 10px;
  color: ${({ theme }) =>
    theme.mode === "light" ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.45)"};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-right: 2px;
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 200px;
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  background: ${({ theme }) =>
    theme.mode === "light"
      ? "rgba(240,242,248,0.92)"
      : "rgba(20,30,55,0.85)"};
  border: 1px solid ${({ theme }) =>
    theme.mode === "light"
      ? "rgba(0,0,0,0.08)"
      : "rgba(255,255,255,0.12)"};
  border-radius: 12px;
  box-shadow: ${({ theme }) =>
    theme.mode === "light"
      ? "0 16px 40px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.9)"
      : "0 16px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)"};
  list-style: none;
  padding: 6px 0;
  margin: 0;
  z-index: 300;
  animation: fadeIn 0.15s ease;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-6px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
`;

const DropdownItem = styled.li`
  padding: 9px 16px;
  font-size: 13px;
  color: ${({ active, theme }) =>
    active ? "#4ecca3" : theme.mode === "light" ? "rgba(0,0,0,0.75)" : "rgba(255,255,255,0.8)"};
  background: ${({ active }) =>
    active ? "rgba(78,204,163,0.1)" : "transparent"};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background 0.15s;

  &:hover {
    background: ${({ theme }) =>
      theme.mode === "light" ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.07)"};
    color: ${({ theme }) => theme.mode === "light" ? "#1a1a2e" : "#ffffff"};
  }

  &::after {
    content: ${({ active }) => (active ? '"✓"' : '""')};
    color: #4ecca3;
    font-size: 12px;
  }
`;

const Divider = styled.div`
  height: 1px;
  background: ${({ theme }) =>
    theme.mode === "light" ? "rgba(0,0,0,0.07)" : "rgba(255,255,255,0.08)"};
  margin: 4px 0;
`;

/* ── Avatar ── */
const Avatar = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4ecca3, #3db892);
  color: #1a1a2e;
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
`;

const ThemeToggleBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: ${({ theme }) =>
    theme.mode === "light" ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.08)"};
  border: 1px solid ${({ theme }) =>
    theme.mode === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.12)"};
  color: ${({ theme }) => theme.mode === "light" ? "#1a1a2e" : "#ffffff"};
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s, transform 0.3s;
  flex-shrink: 0;

  &:hover {
    background: ${({ theme }) =>
      theme.mode === "light" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.16)"};
    transform: rotate(20deg);
  }
`;

function Dropdown({ label, value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <DropdownWrapper ref={ref}>
      <DropdownTrigger onClick={() => setOpen((o) => !o)}>
        <DropdownLabel>{label}</DropdownLabel>
        {value}
      </DropdownTrigger>
      {open && (
        <DropdownMenu>
          {options.map((opt, idx) => (
            <>
              {idx > 0 && idx === Math.floor(options.length / 2) && (
                <Divider key={`div-${idx}`} />
              )}
              <DropdownItem
                key={opt}
                active={opt === value}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
              >
                {opt}
              </DropdownItem>
            </>
          ))}
        </DropdownMenu>
      )}
    </DropdownWrapper>
  );
}

const Navbar = () => {
  const [role, setRole] = useState("Teller");
  const [branch, setBranch] = useState("BR-001 — Jakarta Pusat");
  const [txDate, setTxDate] = useState(new Date().toISOString().slice(0, 10));
  const { isDark, toggle } = useThemeToggle();

  return (
    <Nav>
      <Logo>
        <span>
          Core<em>Bank</em>
        </span>
        <Badge>MFE</Badge>
      </Logo>

      <Right>
        <DateWrapper>
          <DateLabel>Date</DateLabel>
          <DateInput
            type="date"
            value={txDate}
            onChange={(e) => setTxDate(e.target.value)}
          />
        </DateWrapper>
        <Dropdown
          label="Branch"
          value={branch}
          options={branches}
          onChange={setBranch}
        />
        <Dropdown
          label="Role"
          value={role}
          options={roles}
          onChange={setRole}
        />
        <ThemeToggleBtn onClick={toggle} title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}>
          {isDark ? "☀️" : "🌙"}
        </ThemeToggleBtn>
        <Avatar title="Profile">
          {role.slice(0, 2).toUpperCase()}
        </Avatar>
      </Right>
    </Nav>
  );
};

export default Navbar;
