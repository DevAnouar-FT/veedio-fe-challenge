import * as React from "react";

const Item = ({ children }: { children: React.ReactNode }): JSX.Element => (
  <li className="mt-6 first:mt-0">{children}</li>
);

const List = ({ children }: { children: ReturnType<typeof Item>[] }) => (
  <ul className="relative">{children}</ul>
);

List.Item = Item;

export default List;
