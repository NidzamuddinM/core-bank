import { useState } from "react";
import styled, { useTheme } from "styled-components";

/* ── Styled Components ── */
const Wrapper = styled.div`
  width: 100%;
  min-height: 100%;
  background: ${({ theme }) =>
    theme.mode === "light"
      ? "linear-gradient(135deg, #e0f7f1 0%, #e8f4fd 50%, #f0e8ff 100%)"
      : "linear-gradient(135deg, #0f1623 0%, #0d1b2a 50%, #1a0f2e 100%)"};
  padding: 0 0 72px; /* space for fixed ButtonRow */
  border-radius: 12px;
  transition: background 0.4s;
`;

const StickyHeader = styled.div`
  position: sticky;
  top: 64px;
  z-index: 10;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  background: ${({ theme }) =>
    theme.mode === "light"
      ? "rgba(255,255,255,0.6)"
      : "rgba(15,22,35,0.65)"};
  border-bottom: 1px solid ${({ theme }) =>
    theme.mode === "light"
      ? "rgba(255,255,255,0.8)"
      : "rgba(255,255,255,0.08)"};
  padding: 20px 24px 16px;
  margin: 0 -24px;
  transition: background 0.25s;
`;

const PageTitle = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.textPrimary};
  margin-bottom: 4px;
`;

const PageSubtitle = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.textSecondary};
`;

const Card = styled.div`
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  background: ${({ theme }) =>
    theme.mode === "light"
      ? "rgba(255,255,255,0.55)"
      : "rgba(255,255,255,0.05)"};
  border: 1px solid ${({ theme }) =>
    theme.mode === "light"
      ? "rgba(255,255,255,0.9)"
      : "rgba(255,255,255,0.1)"};
  border-radius: 16px;
  padding: 28px;
  margin-top: 20px;
  margin-bottom: 8px;
  box-shadow: ${({ theme }) =>
    theme.mode === "light"
      ? "0 8px 32px rgba(31,38,135,0.1), inset 0 1px 0 rgba(255,255,255,0.8)"
      : "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.07)"};
  transition: background 0.25s, box-shadow 0.25s;
`;

const SectionTitle = styled.h3`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.7px;
  color: ${({ theme }) => theme.accent};
  margin-bottom: 18px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: ${({ cols }) => `repeat(${cols || 2}, 1fr)`};
  gap: 16px 24px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;

const baseInputStyle = `
  padding: 9px 12px;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: border 0.2s;
  width: 100%;
  box-sizing: border-box;
`;

const Input = styled.input`
  ${baseInputStyle}
  background: ${({ theme }) =>
    theme.mode === "light"
      ? "rgba(255,255,255,0.6)"
      : "rgba(255,255,255,0.06)"};
  border: 1px solid ${({ theme }) =>
    theme.mode === "light"
      ? "rgba(200,210,230,0.8)"
      : "rgba(255,255,255,0.1)"};
  color: ${({ theme }) => theme.textPrimary};
  backdrop-filter: blur(4px);
  color-scheme: ${({ theme }) => theme.mode === "dark" ? "dark" : "light"};

  &::-webkit-calendar-picker-indicator {
    filter: ${({ theme }) =>
      theme.mode === "dark" ? "invert(1) opacity(0.6)" : "opacity(0.5)"};
    cursor: pointer;
  }

  &:focus {
    border-color: ${({ theme }) => theme.accent};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.accentBg};
    background: ${({ theme }) =>
      theme.mode === "light"
        ? "rgba(255,255,255,0.9)"
        : "rgba(255,255,255,0.1)"};
  }

  &::placeholder {
    color: ${({ theme }) => theme.textMuted};
  }
`;

const Select = styled.select`
  ${baseInputStyle}
  background: ${({ theme }) =>
    theme.mode === "light"
      ? "rgba(255,255,255,0.6)"
      : "rgba(255,255,255,0.06)"};
  border: 1px solid ${({ theme }) =>
    theme.mode === "light"
      ? "rgba(200,210,230,0.8)"
      : "rgba(255,255,255,0.1)"};
  color: ${({ theme }) => theme.textPrimary};
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%234ecca3' d='M1 1l5 5 5-5'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 32px;

  &:focus {
    border-color: ${({ theme }) => theme.accent};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.accentBg};
  }

  option {
    background: ${({ theme }) => theme.mode === "light" ? "#fff" : "#1e2d4d"};
    color: ${({ theme }) => theme.mode === "light" ? "#1a1a2e" : "#fff"};
  }
`;

const Textarea = styled.textarea`
  ${baseInputStyle}
  background: ${({ theme }) =>
    theme.mode === "light"
      ? "rgba(255,255,255,0.6)"
      : "rgba(255,255,255,0.06)"};
  border: 1px solid ${({ theme }) =>
    theme.mode === "light"
      ? "rgba(200,210,230,0.8)"
      : "rgba(255,255,255,0.1)"};
  color: ${({ theme }) => theme.textPrimary};
  resize: vertical;
  min-height: 72px;
  font-family: inherit;

  &:focus {
    border-color: ${({ theme }) => theme.accent};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.accentBg};
  }

  &::placeholder {
    color: ${({ theme }) => theme.textMuted};
  }
`;

const Divider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.border};
  margin: 24px 0;
`;

const AccountRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr;
  gap: 16px 20px;
  align-items: end;
  padding: 16px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  background: ${({ theme }) =>
    theme.mode === "light"
      ? "rgba(255,255,255,0.4)"
      : "rgba(255,255,255,0.04)"};
  border-radius: 10px;
  border: 1px solid ${({ theme }) =>
    theme.mode === "light"
      ? "rgba(255,255,255,0.8)"
      : "rgba(255,255,255,0.08)"};

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const AccountLabel = styled.p`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${({ theme }) => (props) =>
    props.type === "debit" ? "#ff6b6b" : theme.accent};
  margin-bottom: 12px;
`;

const TypeBadge = styled.span`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 99px;
  font-size: 11px;
  font-weight: 700;
  background: ${({ type }) =>
    type === "debit" ? "rgba(255,107,107,0.15)" : "rgba(78,204,163,0.15)"};
  color: ${({ type }) => (type === "debit" ? "#ff6b6b" : "#4ecca3")};
  margin-bottom: 12px;
`;

const ButtonRow = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 50;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 14px 32px;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  background: ${({ theme }) =>
    theme.mode === "light"
      ? "rgba(255,255,255,0.65)"
      : "rgba(15,22,35,0.7)"};
  border-top: 1px solid ${({ theme }) =>
    theme.mode === "light"
      ? "rgba(255,255,255,0.9)"
      : "rgba(255,255,255,0.08)"};
  transition: background 0.25s;
`;

const Btn = styled.button`
  padding: 9px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;

  &:active {
    transform: scale(0.97);
  }
`;

const BtnPrimary = styled(Btn)`
  background: ${({ theme }) => theme.accent};
  color: #1a1a2e;
  &:hover { background: ${({ theme }) => theme.accentDark}; }
`;

const BtnOutline = styled(Btn)`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.textSecondary};
  &:hover {
    border-color: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.accent};
  }
`;

const SuccessBanner = styled.div`
  padding: 14px 18px;
  background: rgba(78, 204, 163, 0.12);
  border: 1px solid #4ecca3;
  border-radius: 8px;
  color: #4ecca3;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

/* ── Component ── */
const defaultForm = {
  transactionDate: new Date().toISOString().slice(0, 10),
  valueDate: new Date().toISOString().slice(0, 10),
  currency: "IDR",
  description: "",
  reference: "",
  debitAccount: "",
  debitAccountName: "",
  creditAccount: "",
  creditAccountName: "",
  amount: "",
  chargeType: "OUR",
};

const SingleOverbooking = () => {
  const [form, setForm] = useState(defaultForm);
  const [submitted, setSubmitted] = useState(false);

  const set = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleReset = () => {
    setForm(defaultForm);
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Wrapper>
      <StickyHeader>
        <PageTitle>Single Overbooking</PageTitle>
        <PageSubtitle>
          Inter-account fund posting within the same core banking system
        </PageSubtitle>
      </StickyHeader>

      {submitted && (
        <SuccessBanner>
          ✓ Overbooking transaction submitted successfully — awaiting approval
        </SuccessBanner>
      )}

      <form id="overbooking-form" onSubmit={handleSubmit}>
        <Card>
          {/* ── Transaction Header ── */}
          <SectionTitle>Transaction Header</SectionTitle>
          <Grid cols={3}>
            <FormGroup>
              <Label>Transaction Date</Label>
              <Input
                type="date"
                value={form.transactionDate}
                onChange={set("transactionDate")}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Value Date</Label>
              <Input
                type="date"
                value={form.valueDate}
                onChange={set("valueDate")}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Currency</Label>
              <Select value={form.currency} onChange={set("currency")}>
                <option>IDR</option>
                <option>USD</option>
                <option>EUR</option>
                <option>SGD</option>
                <option>JPY</option>
                <option>GBP</option>
              </Select>
            </FormGroup>
          </Grid>

          <Divider />

          {/* ── Debit Account ── */}
          <TypeBadge type="debit">DEBIT</TypeBadge>
          <AccountRow>
            <FormGroup>
              <Label>Account Number</Label>
              <Input
                type="text"
                placeholder="e.g. 1234567890"
                value={form.debitAccount}
                onChange={set("debitAccount")}
                required
                maxLength={20}
              />
            </FormGroup>
            <FormGroup>
              <Label>Account Name</Label>
              <Input
                type="text"
                placeholder="Auto-filled"
                value={form.debitAccountName}
                onChange={set("debitAccountName")}
              />
            </FormGroup>
            <FormGroup>
              <Label>Charge Type</Label>
              <Select value={form.chargeType} onChange={set("chargeType")}>
                <option>OUR</option>
                <option>SHA</option>
                <option>BEN</option>
              </Select>
            </FormGroup>
            <FormGroup>
              <Label>Amount</Label>
              <Input
                type="number"
                placeholder="0"
                min="0"
                value={form.amount}
                onChange={set("amount")}
                required
              />
            </FormGroup>
          </AccountRow>

          <Divider />

          {/* ── Credit Account ── */}
          <TypeBadge type="credit">CREDIT</TypeBadge>
          <AccountRow>
            <FormGroup>
              <Label>Account Number</Label>
              <Input
                type="text"
                placeholder="e.g. 0987654321"
                value={form.creditAccount}
                onChange={set("creditAccount")}
                required
                maxLength={20}
              />
            </FormGroup>
            <FormGroup>
              <Label>Account Name</Label>
              <Input
                type="text"
                placeholder="Auto-filled"
                value={form.creditAccountName}
                onChange={set("creditAccountName")}
              />
            </FormGroup>
            <FormGroup style={{ gridColumn: "span 2" }}>
              <Label>Reference No.</Label>
              <Input
                type="text"
                placeholder="e.g. OVB-2026-00001"
                value={form.reference}
                onChange={set("reference")}
              />
            </FormGroup>
          </AccountRow>

          <Divider />

          {/* ── Description ── */}
          <SectionTitle>Description / Remarks</SectionTitle>
          <FormGroup>
            <Textarea
              placeholder="Enter transaction description or notes..."
              value={form.description}
              onChange={set("description")}
            />
          </FormGroup>
        </Card>
      </form>

      <ButtonRow>
        <BtnOutline type="button" onClick={handleReset}>
          Reset
        </BtnOutline>
        <BtnPrimary type="submit" form="overbooking-form">Submit for Approval</BtnPrimary>
      </ButtonRow>
    </Wrapper>
  );
};

export default SingleOverbooking;
