import { Action } from "../abstracts/Action";
import { Peer } from "../structures/Peer";
import { BaseServer } from "../structures/BaseServer";
import { ActionType } from "../types/action";
import { DialogBuilder } from "../utils/builders/DialogBuilder";
import { Variant } from "growtopia.js";

export default class extends Action {
  constructor() {
    super();
    this.config = {
      eventName: "wrench"
    };
  }

  public handle(
    base: BaseServer,
    peer: Peer,
    action: ActionType<{ action: string; netID: string }>
  ): void {
    let dialog = new DialogBuilder()
      .defaultColor()
      .addLabelWithIcon(peer.data.tankIDName, "32", "small")
      .addTextBox(`Hello your name is ${peer.data.tankIDName}`)
      .addTextBox(`And your netID is ${peer.data.netID}`)
      .addQuickExit()
      .str();

    peer.send(Variant.from({ delay: 100 }, "OnDialogRequest", dialog));
  }
}
