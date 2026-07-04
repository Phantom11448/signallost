import { mission1 } from "./missions/mission1";
import { mission2 } from "./missions/mission2";
import { mission3 } from "./missions/mission3";
import { mission4 } from "./missions/mission4";
import { mission5 } from "./missions/mission5";
import { mission6 } from "./missions/mission6";
import { mission7 } from "./missions/mission7";
import { mission8 } from "./missions/mission8";
import { mission9 } from "./missions/mission9";
import { mission10 } from "./missions/mission10";
import { mission11 } from "./missions/mission11";
import { mission12 } from "./missions/mission12";
import { mission13 } from "./missions/mission13";
import { mission14 } from "./missions/mission14";

export const MISSIONS_DATA = [mission1, mission2, mission3, mission4, mission5, mission6, mission7, mission8, mission9, mission10, mission11, mission12, mission13, mission14];

export function getBugTranscript(upToMissionId) {
	return MISSIONS_DATA
		.filter(m => m.id <= upToMissionId && m.bugExcerpt)
		.map(m => m.bugExcerpt)
		.join("\n");
}
