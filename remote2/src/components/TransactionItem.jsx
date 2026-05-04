import React from "react";
import styled from "styled-components";

const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  border-radius: 10px;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  background: ${({ theme }) =>
    theme.mode === "light"
      ? "rgba(255,255,255,0.35)"
      : "rgba(255,255,255,0.03)"};
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) =>
      theme.mode === "light"
        ? "rgba(255,255,255,0.65)"
        : "rgba(255,255,255,0.07)"};
  }
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Icon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  background: ${({ type }) =>
    type === "credit"
      ? "rgba(78, 204, 163, 0.12)"
      : "rgba(255, 77, 79, 0.12)"};
`;

const Info = styled.div``;

const Description = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.textPrimary || "#1a1a2e"};
  margin-bottom: 2px;
  transition: color 0.2s;
`;

const Meta = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.textMuted || "#999"};
  transition: color 0.2s;
`;

const Amount = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: ${({ type }) => (type === "credit" ? "#4ecca3" : "#ff4d4f")};
`;

const categoryIcon = {
  Transfer: "↗",
  Income: "↙",
  Utilities: "⚡",
  Refund: "↩",
};

const TransactionItem = ({ transaction }) => {
  const { description, amount, type, date, category } = transaction;

  return (
    <Item>
      <Left>
        <Icon type={type}>{categoryIcon[category] || "•"}</Icon>
        <Info>
          <Description>{description}</Description>
          <Meta>
            {category} · {date}
          </Meta>
        </Info>
      </Left>
      <Amount type={type}>{amount}</Amount>
    </Item>
  );
};

export default TransactionItem;
