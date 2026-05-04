import React from "react";
import styled from "styled-components";
import TransactionItem from "./TransactionItem";

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
  border-radius: 12px;
  overflow: hidden;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  background: ${({ theme }) =>
    theme.mode === "light"
      ? "rgba(255,255,255,0.25)"
      : "rgba(255,255,255,0.03)"};
  border: 1px solid ${({ theme }) =>
    theme.mode === "light"
      ? "rgba(255,255,255,0.7)"
      : "rgba(255,255,255,0.07)"};
  padding: 4px;
  transition: background 0.25s;
`;

const TransactionList = ({ transactions }) => {
  return (
    <List>
      {transactions.map((tx) => (
        <TransactionItem key={tx.id} transaction={tx} />
      ))}
    </List>
  );
};

export default TransactionList;
