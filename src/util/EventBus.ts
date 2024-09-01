import mitt from "mitt";

export const eventBus = mitt();

type Events = {
  "update:Nickname": string;
};
