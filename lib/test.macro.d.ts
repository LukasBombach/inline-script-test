import type { VFC } from "react";

export interface ScriptProps {
  children: () => void;
}

declare const Script: VFC<ScriptProps>;

export default Script;
