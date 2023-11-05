class Role {
    private static readonly _values: Role[] = [];

    static readonly UNDEFINED: Role = new Role("未定義");
    static readonly TANK: Role      = new Role("タンク");
    static readonly HEALER: Role    = new Role("ヒーラー");
    static readonly DPS: Role       = new Role("DPS");

    private constructor(
        readonly name: string,
    ) {
        Role._values.push(this);
    }

    equals(role: Role): boolean {
        return this.name === role.name;
    }

    static valueOf(name: string): Role {
        switch (name) {
            case Role.TANK.name:
                return Role.TANK
            case Role.HEALER.name:
                return Role.HEALER
            case Role.DPS.name:
                return Role.DPS;
            default:
                return Role.UNDEFINED;
        }
    }

    static values(): Role[] {
        return [...Role._values];
    }
}

class SubRole {
    private static readonly _values: SubRole[] = [];

    static readonly UNDEFINED: SubRole           = new SubRole("未定義");
    static readonly TANK: SubRole                = new SubRole("タンク");
    static readonly PURE_HEALER: SubRole         = new SubRole("ピュアヒーラー");
    static readonly BARRIER_HEALER: SubRole      = new SubRole("バリアヒーラー");
    static readonly MELEE_DPS: SubRole           = new SubRole("メレー");
    static readonly PHYSICAL_RANGED_DPS: SubRole = new SubRole("レンジ");
    static readonly MAGICAL_RANGED_DPS: SubRole  = new SubRole("キャスター");

    private constructor(
        readonly name: string,
    ) {
        SubRole._values.push(this);
    }

    equals(subRole: SubRole): boolean {
        return this.name === subRole.name;
    }

    isSubRoleOf(role: Role): boolean {
        switch (this.name) {
            case SubRole.TANK.name:
                return role.name === Role.TANK.name;
            case SubRole.PURE_HEALER.name:
            case SubRole.BARRIER_HEALER.name:
                return role.name === Role.HEALER.name;
            case SubRole.MELEE_DPS.name:
            case SubRole.PHYSICAL_RANGED_DPS.name:
            case SubRole.MAGICAL_RANGED_DPS.name:
                return role.name === Role.DPS.name;
            default:
                return false;
        }
    }

    static valueOf(name: string): SubRole {
        switch (name) {
            case SubRole.TANK.name:
                return SubRole.TANK;
            case SubRole.PURE_HEALER.name:
                return SubRole.PURE_HEALER;
            case SubRole.BARRIER_HEALER.name:
                return SubRole.BARRIER_HEALER;
            case SubRole.MELEE_DPS.name:
                return SubRole.MELEE_DPS;
            case SubRole.PHYSICAL_RANGED_DPS.name:
                return SubRole.PHYSICAL_RANGED_DPS;
            case SubRole.MAGICAL_RANGED_DPS.name:
                return SubRole.MAGICAL_RANGED_DPS;
            default:
                return SubRole.UNDEFINED;
        }
    }

    static values(): SubRole[] {
        return [...SubRole._values];
    }
}

class Job {
    private static readonly _values: Job[] = [];

    // undefined
    static readonly UNDEFINED: Job   = new Job("未定義", SubRole.UNDEFINED);
    // tank
    static readonly PARADIN: Job     = new Job("ナイト",         SubRole.TANK);
    static readonly WARRIOR: Job     = new Job("戦士",           SubRole.TANK);
    static readonly DARK_KNIGHT: Job = new Job("暗黒騎士",       SubRole.TANK);
    static readonly GUNBREAKER: Job  = new Job("ガンブレイカー", SubRole.TANK);
    // pure healer
    static readonly WHITE_MAGE: Job  = new Job("白魔道士", SubRole.PURE_HEALER);
    static readonly ASTOROGIAN: Job  = new Job("占星術師", SubRole.PURE_HEALER);
    // barrier healer
    static readonly SCHOLAR: Job     = new Job("学者", SubRole.BARRIER_HEALER);
    static readonly SAGE: Job        = new Job("賢者", SubRole.BARRIER_HEALER);
    // melee dps
    static readonly MONK: Job        = new Job("モンク",   SubRole.MELEE_DPS);
    static readonly DRAGOON: Job     = new Job("竜騎士",   SubRole.MELEE_DPS);
    static readonly NINJA: Job       = new Job("忍者",     SubRole.MELEE_DPS);
    static readonly SAMURAI: Job     = new Job("侍",       SubRole.MELEE_DPS);
    static readonly REAPER: Job      = new Job("リーパー", SubRole.MELEE_DPS);
    // physical ranged dps
    static readonly BARD: Job        = new Job("吟遊詩人", SubRole.PHYSICAL_RANGED_DPS);
    static readonly MACHINIST: Job   = new Job("機工士",   SubRole.PHYSICAL_RANGED_DPS);
    static readonly DANCER: Job      = new Job("踊り子",   SubRole.PHYSICAL_RANGED_DPS);
    // magical ranged dps
    static readonly BLACK_MAGE: Job  = new Job("黒魔道士", SubRole.MAGICAL_RANGED_DPS);
    static readonly SUMMONER: Job    = new Job("召喚士",   SubRole.MAGICAL_RANGED_DPS);
    static readonly RED_MAGE: Job    = new Job("赤魔道士", SubRole.MAGICAL_RANGED_DPS);

    private constructor(
        readonly name: string,
        readonly subRole: SubRole,
    ) {
        Job._values.push(this)
    }

    equals(job: Job): boolean {
        return this.name == job.name;
    }

    isUndefined(): boolean {
        return this.equals(Job.UNDEFINED);
    }

    isTank(): boolean {
        return this.subRole.equals(SubRole.TANK);
   }

    isPureHealer(): boolean {
        return this.subRole.equals(SubRole.PURE_HEALER);
   }

    isBarrierHealer(): boolean {
        return this.subRole.equals(SubRole.BARRIER_HEALER);
   }

    isHealer(): boolean {
        return this.subRole.isSubRoleOf(Role.HEALER);
   }

   isMeleeDps(): boolean {
        return this.subRole.equals(SubRole.MELEE_DPS);
   }

   isPhysicalRangedDps(): boolean {
        return this.subRole.equals(SubRole.PHYSICAL_RANGED_DPS);
   }

   isMagicalRangedDps(): boolean {
        return this.subRole.equals(SubRole.MAGICAL_RANGED_DPS);
   }

    isDps(): boolean {
        return this.subRole.isSubRoleOf(Role.DPS);
   }

    static valueOf(name: string): Job {
        switch (name) {
            case Job.PARADIN.name:
                return Job.PARADIN;
            case Job.WARRIOR.name:
                return Job.WARRIOR;
            case Job.DARK_KNIGHT.name:
                return Job.DARK_KNIGHT;
            case Job.GUNBREAKER.name:
                return Job.GUNBREAKER;
            case Job.WHITE_MAGE.name:
                return Job.WHITE_MAGE;
            case Job.ASTOROGIAN.name:
                return Job.ASTOROGIAN;
            case Job.SCHOLAR.name:
                return Job.SCHOLAR;
            case Job.SAGE.name:
                return Job.SAGE;
            case Job.MONK.name:
                return Job.MONK;
            case Job.DRAGOON.name:
                return Job.DRAGOON;
            case Job.NINJA.name:
                return Job.NINJA;
            case Job.SAMURAI.name:
                return Job.SAMURAI;
            case Job.REAPER.name:
                return Job.REAPER;
            case Job.BARD.name:
                return Job.BARD;
            case Job.MACHINIST.name:
                return Job.MACHINIST;
            case Job.DANCER.name:
                return Job.DANCER;
            case Job.BLACK_MAGE.name:
                return Job.BLACK_MAGE;
            case Job.SUMMONER.name:
                return Job.SUMMONER;
            case Job.RED_MAGE.name:
                return Job.RED_MAGE;
            default:
                return Job.UNDEFINED;
        }
    }

    static values(): Job[] {
        return [...Job._values];
    }
}

class PartyType {
    private static readonly _values: PartyType[] = [];

    static readonly UNDEFINED      = new PartyType("未定義",         0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    static readonly FULL_PARTY     = new PartyType("FULL PARTY",     8, 2, 2, 4, 2, 1, 1, 2, 1, 1, 1, 4);
    static readonly ALLIANCE_PARTY = new PartyType("ALLIANCE PARTY", 8, 1, 2, 5, 1, 1, 1, 2, 1, 1, 1, 5);
    static readonly LIGHT_PARTY    = new PartyType("LIGHT PARTY",    4, 1, 1, 2, 1, 0, 0, 1, 0, 0, 0, 2);

    private constructor(
        readonly name: string,
        readonly numOfPlayers: number,
        readonly numOfTankCapacity: number,
        readonly numOfHealerCapacity: number,
        readonly numOfDpsCapacity: number,
        readonly numOfRequiredTanks: number,
        readonly numOfRequiredPureHealers: number,
        readonly numOfRequiredBarrierHealers: number,
        readonly numOfRequiredHealers: number,
        readonly numOfRequiredMeleeDpses: number,
        readonly numOfRequiredPhysicalRangedDpses: number,
        readonly numOfRequiredMagicalRangedDpses: number,
        readonly numOfRequiredDpses: number,
    ) {
        PartyType._values.push(this);
    }

    equals(partyType: PartyType): boolean {
        return this.name === partyType.name;
    }

    static valueOf(name: string): PartyType {
        switch (name) {
            case PartyType.FULL_PARTY.name:
                return PartyType.FULL_PARTY;
            case PartyType.ALLIANCE_PARTY.name:
                return PartyType.ALLIANCE_PARTY;
            case PartyType.LIGHT_PARTY.name:
                return PartyType.LIGHT_PARTY;
            default:
                return PartyType.UNDEFINED;
        }
    }

    static values(): PartyType[] {
        return [...PartyType._values];
    }
}

class Player {
    private _availableJobs: Job[] = [];
    private _isAbleTo: {
        tank: boolean,
        pureHealer: boolean,
        barrierHealer: boolean,
        healer: boolean,
        meleeDps: boolean,
        physicalRangedDps: boolean,
        magicalRangedDps: boolean,
        dps: boolean,
    } =  {
        tank: false,
        pureHealer: false,
        barrierHealer: false,
        healer: false,
        meleeDps: false,
        physicalRangedDps: false,
        magicalRangedDps: false,
        dps: false,
    };

    constructor(readonly id: number) {}

    setAvailableJob(job: Job) {
        this._availableJobs.push(job);

        if (job.isTank()) {
            this._isAbleTo.tank = true;
        }
        if (job.isPureHealer()) {
            this._isAbleTo.barrierHealer = true;
        }
        if (job.isBarrierHealer()) {
            this._isAbleTo.barrierHealer = true;
        }
        if (job.isHealer()) {
            this._isAbleTo.healer = true;
        }
        if (job.isMeleeDps()) {
            this._isAbleTo.meleeDps = true;
        }
        if (job.isPhysicalRangedDps()) {
            this._isAbleTo.physicalRangedDps = true;
        }
        if (job.isMagicalRangedDps()) {
            this._isAbleTo.magicalRangedDps = true;
        }
        if (job.isDps()) {
            this._isAbleTo.dps = true;
        }
    }

    getAvailableJobs(): Job[] {
        return [...this._availableJobs];
    }

    getNumOfAvailableJobs(): number {
        return this._availableJobs.length;
    }

    isAbleToTank(): boolean {
        return this._isAbleTo.tank;
    }

    isAbleToPureHealer(): boolean {
        return this._isAbleTo.pureHealer;
    }

    isAbleToBarrierHealer(): boolean {
        return this._isAbleTo.barrierHealer;
    }

    isAbleToHealer(): boolean {
        return this._isAbleTo.healer;
    }

    isAbleToMeleeDps(): boolean {
        return this._isAbleTo.meleeDps;
    }

    isAbleToPhysicalRangedDps(): boolean {
        return this._isAbleTo.physicalRangedDps;
    }

    isAbleToMagicalRangedDps(): boolean {
        return this._isAbleTo.magicalRangedDps;
    }

    isAbleToDps(): boolean {
        return this._isAbleTo.dps;
    }
}

class RouletteOption {
    private _partyType: PartyType = PartyType.FULL_PARTY;
    private _allowDupricateJobs: boolean = false;
    private _ignoreHealerSubRole: boolean = false;
    private _ignoreDpsSubRole: boolean = false;
    private _bindedDpsSubRole1: SubRole = SubRole.UNDEFINED;
    private _bindedDpsSubRole2: SubRole = SubRole.UNDEFINED;

    constructor() {}

    setPartyType(partyType: PartyType) {
        this._partyType = partyType;
    }

    partyType(): PartyType {
        return this._partyType;
    }

    enableAllowDupricateJobs() {
        this._allowDupricateJobs = true;
    }

    allowDupricateJobs(): boolean {
        return this._allowDupricateJobs;
    }

    enableIgnoreHealerSubRole() {
        this._ignoreHealerSubRole = true;
    }

    ignoreHealerSubRole(): boolean {
        return this._ignoreHealerSubRole;
    }

    enableIgnoreDpsSubRole() {
        this._ignoreDpsSubRole = true;
    }

    ignoreDpsSubRole(): boolean {
        return this._ignoreDpsSubRole;
    }

    bindDpsSubRole1(subRole: SubRole) {
        if (!subRole.isSubRoleOf(Role.DPS)) {
            return;
        }
        this._bindedDpsSubRole1 = subRole;
    }

    bindedDpsSubRole1(): SubRole {
        return this._bindedDpsSubRole1;
    }

    bindDpsSubRole2(subRole: SubRole) {
        if (!subRole.isSubRoleOf(Role.DPS)) {
            return;
        }
        this._bindedDpsSubRole2 = subRole;
    }

    bindedDpsSubRole2(): SubRole {
        return this._bindedDpsSubRole2;
    }
}

class RouletteStatus {
    private _unpickedPlayers: Player[];
    private _picks: Job[];
    private _picked_role_count: {
        tank: number,
        pureHealer: number,
        barrierHealer: number,
        healer: number,
        meleeDps: number,
        physicalRangedDps: number,
        magicalRangedDps: number,
        dps: number,
    } = {
        tank: 0,
        pureHealer: 0,
        barrierHealer: 0,
        healer: 0,
        meleeDps: 0,
        physicalRangedDps: 0,
        magicalRangedDps: 0,
        dps: 0,
    };

    constructor(
        players: Player[],
    ) {
        this._unpickedPlayers = [...players];
        // stackの深いところに選択肢が多いプレイヤーを沈める
        this._unpickedPlayers.sort((a: Player, b: Player): number => {
            const _a: number = a.getNumOfAvailableJobs();
            const _b: number = b.getNumOfAvailableJobs();
            if (_a < _b) {
                return 1;
            } else if (_a > _b) {
                return -1;
            } else {
                return 0;
            }
        })

        this._picks = (new Array(players.length)).fill(Job.UNDEFINED);
    }

    popPlayer(): Player | undefined {
        return this._unpickedPlayers.pop();
    }

    pushPlayer(player: Player) {
        this._unpickedPlayers.push(player);
    }

    numOfUnpickedPlayers(): number {
        return this._unpickedPlayers.length;
    }

    setPickedJob(player: Player, job: Job) {
        this._picks[player.id] = job;

        if (job.isTank()) {
            this._picked_role_count.tank++;
        }
        if (job.isPureHealer()) {
            this._picked_role_count.pureHealer++;
        }
        if (job.isBarrierHealer()) {
            this._picked_role_count.barrierHealer++;
        }
        if (job.isHealer()) {
            this._picked_role_count.healer++;
        }
        if (job.isMeleeDps()) {
            this._picked_role_count.meleeDps++;
        }
        if (job.isPhysicalRangedDps()) {
            this._picked_role_count.physicalRangedDps++;
        }
        if (job.isMagicalRangedDps()) {
            this._picked_role_count.magicalRangedDps++;
        }
        if (job.isDps()) {
            this._picked_role_count.dps++;
        }
    }

    unsetPickedJob(player: Player) {
        const job: Job = this._picks[player.id];
        this._picks[player.id] = Job.UNDEFINED;

        if (job.isTank()) {
            this._picked_role_count.tank--;
        }
        if (job.isPureHealer()) {
            this._picked_role_count.pureHealer--;
        }
        if (job.isBarrierHealer()) {
            this._picked_role_count.barrierHealer--;
        }
        if (job.isHealer()) {
            this._picked_role_count.healer--;
        }
        if (job.isMeleeDps()) {
            this._picked_role_count.meleeDps--;
        }
        if (job.isPhysicalRangedDps()) {
            this._picked_role_count.physicalRangedDps--;
        }
        if (job.isMagicalRangedDps()) {
            this._picked_role_count.magicalRangedDps--;
        }
        if (job.isDps()) {
            this._picked_role_count.dps--;
        }
    }

    picks(): Job[] {
        return this._picks;
    }

    isAlreadyPicked(job: Job): boolean {
        for (const pick of this._picks) {
            if (job.equals(pick)) {
                return true;
            }
        }
        return false;
    }

    pickedTankCount(): number {
        return this._picked_role_count.tank;
    }

    pickedPureHealerCount(): number {
        return this._picked_role_count.pureHealer;
    }

    pickedBarrierHealerCount(): number {
        return this._picked_role_count.barrierHealer;
    }

    pickedHealerCount(): number {
        return this._picked_role_count.healer;
    }

    pickedMeleeDpsCount(): number {
        return this._picked_role_count.meleeDps;
    }

    pickedPhysicalRangedDpsCount(): number {
        return this._picked_role_count.physicalRangedDps;
    }

    pickedMagicalRangedDpsCount(): number {
        return this._picked_role_count.magicalRangedDps;
    }

    pickedDpsCount(): number {
        return this._picked_role_count.dps;
    }
}

class Roulette {
    private _numOfPlayers: number;

    private _numOfTankCapacity: number;
    private _numOfHealerCapacity: number;
    private _numOfDpsCapacity: number;

    private _numOfRequiredTanks: number;
    private _numOfRequiredPureHealers: number;
    private _numOfRequiredBarrierHealers: number;
    private _numOfRequiredHealers: number;
    private _numOfRequiredMeleeDpses: number;
    private _numOfRequiredPhysicalRangedDpses: number;
    private _numOfRequiredMagicalRangedDpses: number;
    private _numOfRequiredDpses: number;

    private _allowDuplicateJobs: boolean;

    constructor(option: RouletteOption) {
        this._numOfPlayers = option.partyType().numOfPlayers;

        this._numOfTankCapacity = option.partyType().numOfTankCapacity;
        this._numOfHealerCapacity = option.partyType().numOfHealerCapacity;
        this._numOfDpsCapacity = option.partyType().numOfDpsCapacity;

        this._numOfRequiredTanks = option.partyType().numOfRequiredTanks;
        this._numOfRequiredPureHealers = option.partyType().numOfRequiredPureHealers;
        this._numOfRequiredBarrierHealers = option.partyType().numOfRequiredBarrierHealers;
        this._numOfRequiredHealers = option.partyType().numOfRequiredHealers;
        this._numOfRequiredMeleeDpses = option.partyType().numOfRequiredMeleeDpses;
        this._numOfRequiredPhysicalRangedDpses = option.partyType().numOfRequiredPhysicalRangedDpses;
        this._numOfRequiredMagicalRangedDpses = option.partyType().numOfRequiredMagicalRangedDpses;
        this._numOfRequiredDpses = option.partyType().numOfRequiredDpses;

        this._allowDuplicateJobs = option.allowDupricateJobs();

        if (option.bindedDpsSubRole1().equals(SubRole.MELEE_DPS)) {
            this._numOfRequiredMeleeDpses++;
        } else if (option.bindedDpsSubRole1().equals(SubRole.PHYSICAL_RANGED_DPS)) {
            this._numOfRequiredPhysicalRangedDpses++;
        } else if (option.bindedDpsSubRole1().equals(SubRole.MAGICAL_RANGED_DPS)) {
            this._numOfRequiredMagicalRangedDpses++;
        }

        if (option.partyType().equals(PartyType.ALLIANCE_PARTY)) {
            if (option.bindedDpsSubRole2().equals(SubRole.MELEE_DPS)) {
                this._numOfRequiredMeleeDpses++;
            } else if (option.bindedDpsSubRole2().equals(SubRole.PHYSICAL_RANGED_DPS)) {
                this._numOfRequiredPhysicalRangedDpses++;
            } else if (option.bindedDpsSubRole2().equals(SubRole.MAGICAL_RANGED_DPS)) {
                this._numOfRequiredMagicalRangedDpses++;
            }
        }

        if (option.ignoreHealerSubRole()) {
            this._numOfRequiredPureHealers = 0;
            this._numOfRequiredBarrierHealers = 0;
        }

        if (option.ignoreDpsSubRole()) {
            this._numOfRequiredMeleeDpses = 0;
            this._numOfRequiredPhysicalRangedDpses = 0;
            this._numOfRequiredMagicalRangedDpses = 0;
        }
    }

    search(players: Player[]): Job[] {
        const status = new RouletteStatus(players.slice(0, this._numOfPlayers));
        this.dfs(status);

        return status.picks();
    }

    dfs(status: RouletteStatus): boolean {
        if (status.numOfUnpickedPlayers() === 0) {
            if (status.pickedTankCount() < this._numOfRequiredTanks) {
                return false;
            }

            if (status.pickedHealerCount() < this._numOfRequiredHealers) {
                return false;
            }

            if (status.pickedPureHealerCount() < this._numOfRequiredPureHealers) {
                return false;
            }

            if (status.pickedBarrierHealerCount() < this._numOfRequiredBarrierHealers) {
                return false;
            }

            if (status.pickedDpsCount() < this._numOfRequiredDpses) {
                return false;
            }

            if (status.pickedMeleeDpsCount() < this._numOfRequiredMeleeDpses) {
                return false;
            }

            if (status.pickedPhysicalRangedDpsCount() < this._numOfRequiredPhysicalRangedDpses) {
                return false;
            }

            if (status.pickedMagicalRangedDpsCount() < this._numOfRequiredMagicalRangedDpses) {
                return false;
            }

            return true;
        }

        const player: Player | undefined = status.popPlayer();

        const availableJobs: Job[] = (player as Player).getAvailableJobs();
        Roulette.shuffle(availableJobs);

        for (const job of availableJobs) {
            if (!this._allowDuplicateJobs && status.isAlreadyPicked(job)) {
                continue;
            }

            if (job.isTank() && (status.pickedTankCount() >= this._numOfTankCapacity)) {
                continue;
            }

            if (job.isHealer() && (status.pickedHealerCount() >= this._numOfHealerCapacity)) {
                continue;
            }

            if (job.isDps() && (status.pickedDpsCount() >= this._numOfDpsCapacity)) {
                continue;
            }

            status.setPickedJob(player as Player, job);

            if (this.dfs(status)) {
                return true;
            }

            status.unsetPickedJob(player as Player);
        }

        status.pushPlayer(player as Player);

        return false;
    }

    static shuffle<T>(array: Array<T>) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}
