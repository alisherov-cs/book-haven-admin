import { memo } from "react";

type TChildProps = {
  prop: string | null;
};

export const Child = memo(({ prop }: TChildProps) => {
  console.log("child");

  return <h1>child: {prop}</h1>;
});
