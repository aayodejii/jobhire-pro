interface UrlConfig {
    API_URL: string;
}

interface ClientUrlConfig {
    CLIENT_URL: string;
}

interface EnvConfig {
    API_ENV: string;
}

interface Config {
    url: UrlConfig;
    client_url: ClientUrlConfig;
    env: EnvConfig;
}

const prod: Config = {
    url: {
        API_URL: "https://api.nextrole.co.uk",
    },
    client_url: {
        CLIENT_URL: "https://nextrole.co.uk",
    },

    env: {
        API_ENV: "production",
    },
};

const dev: Config = {
    url: {
        API_URL: "http://localhost:8000",
    },
    client_url: {
        CLIENT_URL: "http://localhost:3000",
    },

    env: {
        API_ENV: "development",
    },
};

export const config: Config =
    process.env.NODE_ENV === "development" ? dev : prod;
