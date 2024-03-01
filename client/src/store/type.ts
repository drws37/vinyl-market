import type { Dispatch } from "react";


export type Context={
    state:State;
     dispatch:Dispatch<Action>;
     toggleTheme: () => void
 }
