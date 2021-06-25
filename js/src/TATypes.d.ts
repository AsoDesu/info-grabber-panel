interface packet {
	Size: number;
	SpecificPacketSize: number;
	Id: string;
	From: string;
	Type: number;
	SpecificPacket: any;
}

interface Event_CoordinatorConnectResponse extends packet {
	SpecificPacket: {
		Self: coordinator;
		State: {
			ServerSettings: serverConfig;
			Players: player[];
			Coordinators: coordinator;
			Matches: match[];
			Events: any[];
			KnownHosts: string[];
		};
		ServerVersion: number;
		Type: number;
		Message: string;
	};
}

interface coordinator {
	GetIcon: string;
	UserId: string;
	Id: string;
	Name: string;
}

interface server {
	Name: string;
	Address: string;
	Port: string;
}

interface team {
	Id: string;
	Name: string;
}

interface serverConfig {
	ServerName: string;
	Password: string;
	EnableTeams: boolean;
	Teams: team[];
	ScoreUpdateFrequency: number;
	BannedMods: string[];
}

interface player {
	UserId: string;
	Team: team;
	PlayState: number;
	DownloadState: number;
	Score: number;
	Combo: number;
	Accuracy: number;
	SongPosition: number;
	SongList: null;
	ModList: string[];
	StreamScreenCoordinates: {
		x: number;
		y: 0;
	};
	StreamDelayMs: number;
	StreamSyncStartMs: number;
	Id: string;
	Name: string;
}

interface match {
	Guid: string;
	Players: player[];
	Leader: coordinator;
	SelectedLevel: {
		LevelId: string;
		Name: string;
		Characteristics: characteristic[];
		Loaded: boolean;
	} | null;
	SelectedCharacteristic: characteristic | null;
	SelectedDifficulty: number;
}

interface characteristic {
	SerializedName: string;
	Difficulties: number[];
}
