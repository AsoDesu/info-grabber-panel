type infoFile = {
	players: player[];
	song: {
		bsr: string;
		diff: string;
		failed?: boolean;
	};
	watch: boolean;
	streams: boolean;
	panel: boolean;
	taip: {
		ip: string;
		password: string;
		failed?: boolean;
	};
};

type player = {
	id: string;
	twitch: string;
	failed?: boolean;
};
