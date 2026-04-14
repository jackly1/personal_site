4/13/26:

&emsp; &emsp; Got a nice few hours in. workflow stage was super bloated and unnecessarily large in its token usage. had been running separate theater calls to re-rank "intelligently" on the TMDB rankings, decided to just use TMDB rankings and pass all films into one single call. These re-rank calls which seemed small were burning ~53k tokens per instance of workflow. With this was hitting rates super fast, esepecially w/ GroqCloud 500k TPD limit. Reduced from 190s to ~55s in wall time. Old per-run tokens ~66k, now about 13-15k (81% decrease). Building for ~75 daily generations, expecting to scale across 3 scheduled batches at 3 separate points in teh day to workaround the 500k TPD limit. Also added a 8192 max_tokens cap to avoid truncating on json film output, now getting 25 films rather than 12.

&emsp; &emsp; Built out queue infrastructure skeleton + some basic implementations. 6 cron jobs covering all freq tiers (once daily (x3 sends/day as this is expectedly going to be the highest seleciton upon sign-up), three times a week, once a week, once a month).

&emsp; &emsp; Added token tracking, additional TPM rate limiting as GroqCloud is generous but not THAT generous, as well as a TPM ceiling with alerts

4/12/26:
&emsp; &emsp; Hit free limits on GroqCloud yesterday so had to stop for a bit. Manual rendering is working fine but still had some trouble fixing the escaped quotations. Ultimately realized it was just a json quirk that when I passed the html into a json obj., it escaped all quotes. In the end stack overflow came in clutch and claude couldn't seem to come up with a fix on its own, which I am curious about as it's quite simple. Easy fix!

4/11/26:
&emsp; &emsp; Worked on fixing newsletter. Was using handlebars but have been having crazy trouble with rendering the LLM generated newsletter format. Bug persisted where all quations appeared escaped, e.g., rather than " all appeared as \". Rebuilt manual rendering as I just simply couldn't figure out how to avoid this while using handlebars. Tried editing template file, reading Handlebars docs, using triple-stash, using SafeString, none of which to any avail.