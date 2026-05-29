// Sirf types import karne hain not the code.
import type { ActionLog, ActionStatus, ActionType } from './types';
import { isMutationType } from './types';

export class ActionTracker {
    // actions ek ActionLog (type) ke objects ka array hai
  private actions: ActionLog[] = [];

    // class ke andar ka method hai ye issliye we did not write function keyword
    // entry - parameter
    // Omit is a built in ts utility which means take the type and remove some properties (Advanced TypeScript)
    // & - intersection karta hai (combine multiple types together)
    // omit id and timestamp ko remove karega or and parameter system ke inputted id or timestamp ko usme add karega.
    // id or timestamp optional rahenge idhar.
    // ...entry.deatils (spread operator) used to make copies details is a copy of entry.details
  log(
    entry: Omit<ActionLog, 'id' | 'timestamp'> & {
      id?: string;
      timestamp?: Date;
    },
  ): ActionLog {
    const action: ActionLog = {
      id: entry.id ?? `action_${this.actions.length}`,
      timestamp: entry.timestamp ?? new Date(),
      type: entry.type,
      path: entry.path,
      details: { ...entry.details },
      status: entry.status,
      userApproved: entry.userApproved,
    };
    this.actions.push(action);
    return action;
  }

//   readonly means you can read the array (Actionlog) but should not change it.
//   here the returnType is a list of ActionLog type but in a readonly format
  getActions(): readonly ActionLog[] {
    return this.actions;
  }


  getPendingMutations(): ActionLog[] {
    return this.actions.filter(
      (a) => isMutationType(a.type) && a.status === 'pending',
    );
  }

  updateStatus(id: string, status: ActionStatus, userApproved?: boolean): void {
    // syntex for find array.find((item) => condition)
    const a = this.actions.find((x) => x.id === id);
    if (!a) return;
    a.status = status;
    if (userApproved !== undefined) a.userApproved = userApproved;
  }
}
