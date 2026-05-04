import React from "react";
import styled from "styled-components";

const Card = styled.div`
  backdrop-filter: blur(20px) saturate(160%);
  -webkit-backdrop-filter: blur(20px) saturate(160%);
  background: ${({ theme }) =>
    theme.mode === "light"
      ? "rgba(255,255,255,0.5)"
      : "rgba(255,255,255,0.06)"};
  border: 1px solid ${({ theme }) =>
    theme.mode === "light"
      ? "rgba(255,255,255,0.85)"
      : "rgba(255,255,255,0.12)"};
  border-radius: 16px;
  padding: 20px;
  position: relative;
  overflow: hidden;
  box-shadow: ${({ theme }) =>
    theme.mode === "light"
      ? "0 8px 32px rgba(31,38,135,0.1), inset 0 1px 0 rgba(255,255,255,0.9)"
      : "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)"};
  transition: background 0.25s, box-shadow 0.25s;

  &::before {
    content: "";
    position: absolute;
    top: -60px;
    right: -60px;
    width: 160px;
    height: 160px;
    background: ${({ theme }) =>
      theme.mode === "light"
        ? "rgba(78,204,163,0.12)"
        : "rgba(78,204,163,0.1)"};
    border-radius: 50%;
    filter: blur(20px);
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -40px;
    left: -20px;
    width: 120px;
    height: 120px;
    background: ${({ theme }) =>
      theme.mode === "light"
        ? "rgba(100,120,255,0.06)"
        : "rgba(100,120,255,0.08)"};
    border-radius: 50%;
    filter: blur(20px);
  }
`;

const AccountType = styled.p`
  font-size: 12px;
  color: ${({ theme }) =>
    theme.mode === "light" ? "#888ea8" : "rgba(255,255,255,0.6)"};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
  transition: color 0.25s;
`;

const AccountNumber = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) =>
    theme.mode === "light" ? "#444c68" : "rgba(255,255,255,0.85)"};
  margin-bottom: 16px;
  font-family: monospace;
  transition: color 0.25s;
`;

const Balance = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) =>
    theme.mode === "light" ? "#1a1a2e" : "#4ecca3"};
  transition: color 0.25s;
`;

const Currency = styled.span`
  font-size: 13px;
  color: ${({ theme }) =>
    theme.mode === "light" ? "#4ecca3" : "rgba(255,255,255,0.5)"};
  margin-left: 6px;
  font-weight: 600;
  transition: color 0.25s;
`;

const StatusBadge = styled.span`
  position: absolute;
  top: 16px;
  right: 16px;
  background: ${({ status }) =>
    status === "active" ? "rgba(78, 204, 163, 0.2)" : "rgba(255, 77, 79, 0.2)"};
  color: ${({ status }) => (status === "active" ? "#4ecca3" : "#ff4d4f")};
  font-size: 11px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 99px;
  text-transform: capitalize;
`;

const AccountCard = ({ account }) => {
  return (
    <Card>
      <StatusBadge status={account.status}>{account.status}</StatusBadge>
      <AccountType>{account.type}</AccountType>
      <AccountNumber>{account.number}</AccountNumber>
      <Balance>
        {account.balance}
        <Currency> {account.currency}</Currency>
      </Balance>
    </Card>
  );
};

export default AccountCard;
