const http = require('http');
const crypto = require('crypto');

const server = http.createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        return res.end();
    }

    const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const type = parsedUrl.searchParams.get('type');
    const q = parsedUrl.searchParams.get('q');

    if (!q) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'missing q' }));
    }

    let data = {};
    let scriptSteps = [];
    const headers = { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" };
    const safeFetch = async (fn) => { try { return await fn(); } catch (e) { return null; } };

    if (type === "username") {
        const [gh, rd, mc, rb, steam, kb, gl, hn, twitch, tiktok, chess, lichess, npm, pypi, docker, bb] = await Promise.all([
            safeFetch(async () => (await fetch(`https://api.github.com/users/${q}`, { headers })).json()),
            safeFetch(async () => (await fetch(`https://www.reddit.com/user/${q}/about.json`, { headers })).json()),
            safeFetch(async () => (await fetch(`https://api.mojang.com/users/profiles/minecraft/${q}`)).json()),
            safeFetch(async () => (await fetch(`https://users.roblox.com/v1/usernames/users`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ usernames: [q], excludeBannedUsers: false }) })).json()),
            safeFetch(async () => (await fetch(`https://steamcommunity.com/id/${q}/?xml=1`)).text()),
            safeFetch(async () => (await fetch(`https://keybase.io/_/api/1.0/user/lookup.json?username=${q}`)).json()),
            safeFetch(async () => (await fetch(`https://gitlab.com/api/v4/users?username=${q}`)).json()),
            safeFetch(async () => (await fetch(`https://hacker-news.firebaseio.com/v0/user/${q}.json`)).json()),
            safeFetch(async () => (await fetch(`https://decapi.me/twitch/avatar/${q}`)).text()),
            safeFetch(async () => (await fetch(`https://www.tiktok.com/@${q}`, { headers })).text()),
            safeFetch(async () => (await fetch(`https://api.chess.com/pub/player/${q}`, { headers })).json()),
            safeFetch(async () => (await fetch(`https://lichess.org/api/user/${q}`, { headers })).json()),
            safeFetch(async () => (await fetch(`https://registry.npmjs.org/${q}`, { headers })).json()),
            safeFetch(async () => (await fetch(`https://pypi.org/pypi/${q}/json`, { headers })).json()),
            safeFetch(async () => (await fetch(`https://hub.docker.com/v2/users/${q}/`, { headers })).json()),
            safeFetch(async () => (await fetch(`https://api.bitbucket.org/2.0/users/${q}`, { headers })).json())
        ]);

        let steamData = "Not found";
        if (steam && steam.includes("<steamID64>")) {
            const id = steam.match(/<steamID64>(.*?)<\/steamID64>/)[1];
            steamData = { id64: id, url: `https://steamcommunity.com/profiles/${id}` };
        }

        data = {
            github: gh && !gh.message ? { name: gh.name, bio: gh.bio, company: gh.company, location: gh.location, email: gh.email, twitter: gh.twitter_username, repos: gh.public_repos } : "Not found",
            reddit: rd && rd.data && rd.data.name ? { karma: rd.data.link_karma + rd.data.comment_karma, created: new Date(rd.data.created_utc * 1000).toLocaleDateString() } : "Not found",
            minecraft: mc && mc.id ? { name: mc.name, uuid: mc.id } : "Not found",
            roblox: rb && rb.data && rb.data.length > 0 ? { id: rb.data[0].id, name: rb.data[0].name, display: rb.data[0].displayName } : "Not found",
            steam: steamData,
            twitch: twitch && !twitch.includes("not found") ? { avatar: twitch, url: `https://twitch.tv/${q}` } : "Not found",
            tiktok: tiktok && tiktok.includes(`"uniqueId":"${q}"`) ? "Account Exists" : "Not found",
            chess: chess && !chess.code ? { name: chess.name, joined: new Date(chess.joined * 1000).toLocaleDateString() } : "Not found",
            lichess: lichess && lichess.id ? { created: new Date(lichess.createdAt).toLocaleDateString() } : "Not found",
            npm: npm && npm.name ? { email: npm.maintainers ? npm.maintainers[0].email : "None", created: npm.time.created } : "Not found",
            pypi: pypi && pypi.info ? { author: pypi.info.author, email: pypi.info.author_email } : "Not found",
            docker: docker && docker.username ? { fullname: docker.full_name, joined: docker.date_joined } : "Not found",
            bitbucket: bb && bb.username ? { display: bb.display_name, created: bb.created_on } : "Not found",
            keybase: kb && kb.status && kb.status.code === 0 && kb.them ? { fullname: kb.them[0].profile?.full_name || "None" } : "Not found"
        };

        scriptSteps = [
            "GitHub Check: Look at their repos. Dig into the commit history for their real email address.",
            "If GitHub returned a name, run it through TruePeopleSearch immediately.",
            "Roblox Check: Take the ID and run it through RoSeal to find past usernames and aliases.",
            "Steam Check: Look at their friends list and comments for real-life names.",
            "NPM/PyPI Check: Developer packages often leak real emails in the metadata.",
            "Check the 50-Matrix below for Twitter, Instagram, and Discord matches."
        ];
    } 
    else if (type === "email") {
        const md5 = crypto.createHash('md5').update(q.trim().toLowerCase()).digest('hex');
        const [er, xon, kb] = await Promise.all([
            safeFetch(async () => (await fetch(`https://emailrep.io/${q}`, { headers })).json()),
            safeFetch(async () => (await fetch(`https://api.xposedornot.com/v1/check-email/${q}`)).json()),
            safeFetch(async () => (await fetch(`https://keybase.io/_/api/1.0/user/lookup.json?email=${q}`)).json())
        ]);

        data = {
            emailrep: er || "No data",
            breaches: xon && xon.breaches ? xon.breaches.join(", ") : "No breaches found",
            keybase: kb && kb.status && kb.status.code === 0 && kb.them ? { fullname: kb.them[0].profile?.full_name || "None" } : "Not found",
            gravatar: `https://gravatar.com/avatar/${md5}.json`
        };

        scriptSteps = [
            "Check the Gravatar profile picture. Reverse-image search it on Yandex.",
            "If the email is a real name (john.doe@), search that name on TruePeopleSearch.",
            "Review the automated breaches. Go to Dehashed.com and search for plaintext passwords.",
            "Take any found password and search it in quotes on Google.",
            "Check Keybase for linked social proofs."
        ];
    }
    else if (type === "ip") {
        const [ipinfo, ipapi, shodan] = await Promise.all([
            safeFetch(async () => (await fetch(`https://ipinfo.io/${q}/json`, { headers })).json()),
            safeFetch(async () => (await fetch(`http://ip-api.com/json/${q}?fields=status,country,regionName,city,zip,lat,lon,timezone,isp,org,as,asname,reverse,mobile,proxy,hosting,query`, { headers })).json()),
            safeFetch(async () => (await fetch(`https://internetdb.shodan.io/${q}`, { headers })).json())
        ]);

        data = {
            ipinfo: ipinfo || "No data",
            ip_api: ipapi || "No data",
            shodan_ports: shodan && shodan.ports ? shodan.ports.join(", ") : "None",
            shodan_vulns: shodan && shodan.vulns ? shodan.vulns.join(", ") : "None"
        };

        scriptSteps = [
            "Pivot to the ISP. If it's residential, note the city/state.",
            "Check Shodan ports. If 80/443 is open, try visiting the IP in a browser.",
            "Check the 'proxy' flag in ip-api. If true, they are using a VPN.",
            "Dork the IP in quotes on Google."
        ];
    }
    else if (type === "name") {
        data = {
            TruePeopleSearch: `https://www.truepeoplesearch.com/results?name=${encodeURIComponent(q)}`,
            FastPeopleSearch: `https://www.fastpeoplesearch.com/name/${encodeURIComponent(q.replace(/\s+/g, '-'))}`,
            ThatsThem: `https://thatsthem.com/name/${encodeURIComponent(q.replace(/\s+/g, '-'))}`,
            Whitepages: `https://www.whitepages.com/name/${encodeURIComponent(q.replace(/\s+/g, '-'))}`,
            VoterRecords: `https://voterrecords.com/search?q=${encodeURIComponent(q)}`,
            CourtListener: `https://www.courtlistener.com/?q=${encodeURIComponent('"' + q + '"')}`,
            Obituaries: `https://www.google.com/search?q=${encodeURIComponent('"' + q + '"')}+obituary`
        };

        scriptSteps = [
            "Run the name through TruePeopleSearch for addresses and relatives.",
            "Cross-check on FastPeopleSearch and ThatsThem.",
            "Check VoterRecords to confirm current address.",
            "Search the name + 'LinkedIn' on Google.",
            "Check CourtListener for federal lawsuits.",
            "Search the name + 'Obituary' for family trees."
        ];
    }

    const qE = encodeURIComponent(q);
    const qQ = encodeURIComponent(`"${q}"`);

    data["FORGE_AI_SCRIPT"] = scriptSteps;
    data["50_PLATFORM_MATRIX"] = {
        "01_Google": `https://www.google.com/search?q=${qQ}`,
        "02_Bing": `https://www.bing.com/search?q=${qQ}`,
        "03_Yandex": `https://yandex.com/search/?text=${qQ}`,
        "04_DuckDuckGo": `https://duckduckgo.com/html/?q=${qQ}`,
        "05_YouTube": `https://www.youtube.com/results?search_query=${qE}`,
        "06_Facebook": `https://www.google.com/search?q=${qQ}+site%3Afacebook.com`,
        "07_Instagram": `https://www.google.com/search?q=${qQ}+site%3Ainstagram.com`,
        "08_Twitter/X": `https://www.google.com/search?q=${qQ}+site%3Atwitter.com+OR+site%3Ax.com`,
        "09_TikTok": `https://www.google.com/search?q=${qQ}+site%3Atiktok.com`,
        "10_LinkedIn": `https://www.google.com/search?q=${qQ}+site%3Alinkedin.com%2Fin`,
        "11_Reddit": `https://www.google.com/search?q=${qQ}+site%3Areddit.com`,
        "12_GitHub": `https://www.google.com/search?q=${qQ}+site%3Agithub.com`,
        "13_Steam": `https://www.google.com/search?q=${qQ}+site%3Asteamcommunity.com`,
        "14_Roblox": `https://www.google.com/search?q=${qQ}+site%3Aroblox.com`,
        "15_Twitch": `https://www.google.com/search?q=${qQ}+site%3Atwitch.tv`,
        "16_Pinterest": `https://www.google.com/search?q=${qQ}+site%3Apinterest.com`,
        "17_Tumblr": `https://www.google.com/search?q=${qQ}+site%3Atumblr.com`,
        "18_Medium": `https://www.google.com/search?q=${qQ}+site%3Amedium.com`,
        "19_Substack": `https://www.google.com/search?q=${qQ}+site%3Asubstack.com`,
        "20_Spotify": `https://www.google.com/search?q=${qQ}+site%3Aspotify.com`,
        "21_SoundCloud": `https://www.google.com/search?q=${qQ}+site%3Asoundcloud.com`,
        "22_Pastebin": `https://www.google.com/search?q=${qQ}+site%3Apastebin.com`,
        "23_TruePeople": `https://www.truepeoplesearch.com/results?name=${qE}`,
        "24_VoterRecords": `https://voterrecords.com/search?q=${qE}`,
        "25_Whitepages": `https://www.whitepages.com/name/${qE}`,
        "26_OpenCorp": `https://opencorporates.com/companies?q=${qE}`,
        "27_CourtListener": `https://www.courtlistener.com/?q=${qQ}`,
        "28_Dehashed": `https://dehashed.com/search?query=${qE}`,
        "29_LeakCheck": `https://leakcheck.io/`,
        "30_HIBP": `https://haveibeenpwned.com/account/${qE}`,
        "31_Keybase": `https://keybase.io/${qE}`,
        "32_Telegram": `https://t.me/${qE}`,
        "33_Discord": `https://www.google.com/search?q=${qQ}+site%3Adiscord.com`,
        "34_Snapchat": `https://www.google.com/search?q=${qQ}+site%3Asnapchat.com`,
        "35_Venmo": `https://www.google.com/search?q=${qQ}+site%3Avenmo.com`,
        "36_CashApp": `https://www.google.com/search?q=${qQ}+site%3Acash.app`,
        "37_Zillow": `https://www.zillow.com/homes/${qE}_rb/`,
        "38_Indeed": `https://www.google.com/search?q=${qQ}+site%3Aindeed.com`,
        "39_PDF_Search": `https://www.google.com/search?q=${qQ}+filetype%3Apdf`,
        "40_CSV_Search": `https://www.google.com/search?q=${qQ}+filetype%3Acsv+OR+filetype%3Axlsx`,
        "41_GitLab": `https://www.google.com/search?q=${qQ}+site%3Agitlab.com`,
        "42_Bitbucket": `https://www.google.com/search?q=${qQ}+site%3Abitbucket.org`,
        "43_Docker": `https://www.google.com/search?q=${qQ}+site%3Ahub.docker.com`,
        "44_NPM": `https://www.google.com/search?q=${qQ}+site%3Anpmjs.com`,
        "45_PyPI": `https://www.google.com/search?q=${qQ}+site%3Apypi.org`,
        "46_HackerNews": `https://www.google.com/search?q=${qQ}+site%3Anews.ycombinator.com`,
        "47_Chess": `https://www.google.com/search?q=${qQ}+site%3Achess.com`,
        "48_Lichess": `https://www.google.com/search?q=${qQ}+site%3Alichess.org`,
        "49_Imgur": `https://www.google.com/search?q=${qQ}+site%3Aimgur.com`,
        "50_Flickr": `https://www.google.com/search?q=${qQ}+site%3Aflickr.com`
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
