class SpreadsheetIO {
    private static readonly NUMBER_OF_PLAYERS: number = 8;
    private static readonly PLAYERS_INFORMATION_RANGE: string = "D3:V10";
    private static readonly ROULETTE_OPTION_RANGE: string = "C12:C17";
    private static readonly ROULETTE_OPTION_PARTY_TYPE_INDEX: number = 0;
    private static readonly ROULETTE_OPTION_ALLOW_DUPLICATE_JOBS_INDEX: number = 1;
    private static readonly ROULETTE_OPTION_IGNORE_HEALER_SUBROLE_INDEX: number = 2;
    private static readonly ROULETTE_OPTION_IGNORE_DPS_SUBROLE_INDEX: number = 3;
    private static readonly ROULETTE_OPTION_BINDED_DPS_SUBROLE_1_INDEX: number = 4;
    private static readonly ROULETTE_OPTION_BINDED_DPS_SUBROLE_2_INDEX: number = 5;
    private static readonly ROULETTE_RESULT_RANGE: string = "A3:A10";

    _sheet: GoogleAppsScript.Spreadsheet.Sheet = SpreadsheetApp.getActiveSheet();

    constructor() {}

    readPlayersInformationInput(): any[][] {
        return this._sheet.getRange(SpreadsheetIO.PLAYERS_INFORMATION_RANGE).getValues();
    }

    decodePlayersInformationInput(playersInformationInput: any[][]): Player[] {
        const players: Player[] = [];

        for (const [idx, info] of playersInformationInput.entries()) {
            const player: Player = new Player(idx);
            for (const value of info) {
                if (typeof value !== "number") {
                    continue;
                }

                player.setAvailableJob(SpreadsheetIO.idToJob(value));
            }
            players.push(player);
        }

        return players;
    }

    readRouletteOptionInput(): any[][] {
        return this._sheet.getRange(SpreadsheetIO.ROULETTE_OPTION_RANGE).getValues();
    }

    decodeRouletteOptionInput(searchOptionInput: any[][]): RouletteOption {
        const option: RouletteOption = new RouletteOption();

        option.setPartyType(SpreadsheetIO.stringToPartyType(searchOptionInput[SpreadsheetIO.ROULETTE_OPTION_PARTY_TYPE_INDEX][0]));

        if (searchOptionInput[SpreadsheetIO.ROULETTE_OPTION_ALLOW_DUPLICATE_JOBS_INDEX][0] === 1) {
            option.enableAllowDupricateJobs();
        }

        if (searchOptionInput[SpreadsheetIO.ROULETTE_OPTION_IGNORE_HEALER_SUBROLE_INDEX][0] === 1) {
            option.enableIgnoreHealerSubRole();
        }

        if (searchOptionInput[SpreadsheetIO.ROULETTE_OPTION_IGNORE_DPS_SUBROLE_INDEX][0] === 1) {
            option.enableIgnoreDpsSubRole();
        }

        option.bindDpsSubRole1(SpreadsheetIO.stringToSubRole(searchOptionInput[SpreadsheetIO.ROULETTE_OPTION_BINDED_DPS_SUBROLE_1_INDEX][0]));
        option.bindDpsSubRole2(SpreadsheetIO.stringToSubRole(searchOptionInput[SpreadsheetIO.ROULETTE_OPTION_BINDED_DPS_SUBROLE_2_INDEX][0]));

        return option;
    }

    encodeRouletteResult(rouletteResult: Job[]): number[][] {
        const encodedResult: number[][] = [];

        for (const job of rouletteResult) {
            encodedResult.push([SpreadsheetIO.jobToId(job)]);
        }

        for (let i = encodedResult.length; i < SpreadsheetIO.NUMBER_OF_PLAYERS; i++) {
            encodedResult.push([SpreadsheetIO.jobToId(Job.UNDEFINED)]);
        }

        return encodedResult;
    }

    displayRouletteResult(encodedRouletteResult: number[][]) {
        this._sheet.getRange(SpreadsheetIO.ROULETTE_RESULT_RANGE).setValues(encodedRouletteResult);
    }

    static idToJob(id: number): Job {
        switch (id) {
            case 0:
                return Job.PARADIN;
            case 1:
                return Job.WARRIOR;
            case 2:
                return Job.DARK_KNIGHT;
            case 3:
                return Job.GUNBREAKER;
            case 4:
                return Job.WHITE_MAGE;
            case 5:
                return Job.ASTOROGIAN;
            case 6:
                return Job.SCHOLAR;
            case 7:
                return Job.SAGE;
            case 8:
                return Job.MONK;
            case 9:
                return Job.DRAGOON;
            case 10:
                return Job.NINJA;
            case 11:
                return Job.SAMURAI;
            case 12:
                return Job.REAPER;
            case 13:
                return Job.BARD;
            case 14:
                return Job.MACHINIST;
            case 15:
                return Job.DANCER;
            case 16:
                return Job.BLACK_MAGE;
            case 17:
                return Job.SUMMONER;
            case 18:
                return Job.RED_MAGE;
            default:
                return Job.UNDEFINED;
        }
    }

    static jobToId(job: Job): number {
        switch (job.name) {
            case Job.PARADIN.name:
                return 0;
            case Job.WARRIOR.name:
                return 1;
            case Job.DARK_KNIGHT.name:
                return 2
            case Job.GUNBREAKER.name:
                return 3
            case Job.WHITE_MAGE.name:
                return 4
            case Job.ASTOROGIAN.name:
                return 5
            case Job.SCHOLAR.name:
                return 6
            case Job.SAGE.name:
                return 7
            case Job.MONK.name:
                return 8
            case Job.DRAGOON.name:
                return 9
            case Job.NINJA.name:
                return 10
            case Job.SAMURAI.name:
                return 11
            case Job.REAPER.name:
                return 12
            case Job.BARD.name:
                return 13
            case Job.MACHINIST.name:
                return 14
            case Job.DANCER.name:
                return 15
            case Job.BLACK_MAGE.name:
                return 16
            case Job.SUMMONER.name:
                return 17
            case Job.RED_MAGE.name:
                return 18
            default:
                return -1
        }
    }

    static stringToPartyType(s: string): PartyType {
        switch (s) {
            case "FULL PARTY":
                return PartyType.FULL_PARTY;
            case "ALLIANCE PARTY":
                return PartyType.ALLIANCE_PARTY;
            case "LIGHT PARTY":
                return PartyType.LIGHT_PARTY;
            default:
                return PartyType.FULL_PARTY;
        }
    }

    static stringToSubRole(s: string): SubRole {
        switch (s) {
            case "メレー":
                return SubRole.MELEE_DPS;
            case "レンジ":
                return SubRole.PHYSICAL_RANGED_DPS;
            case "キャスター":
                return SubRole.MAGICAL_RANGED_DPS;
            default:
                return SubRole.UNDEFINED;
        }
    }
}

function run() {
    const io: SpreadsheetIO = new SpreadsheetIO();

    const option: RouletteOption = io.decodeRouletteOptionInput(io.readRouletteOptionInput());
    const roulette: Roulette = new Roulette(option);
    const players: Player[] = io.decodePlayersInformationInput(io.readPlayersInformationInput());

    const result: Job[] = roulette.search(players);

    io.displayRouletteResult(io.encodeRouletteResult(result));
}
