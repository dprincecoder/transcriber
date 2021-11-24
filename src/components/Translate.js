import axios from "axios";
import React, { useEffect, useState } from "react";
import "./translate.scss";

const langURL = "https://libretranslate.de/languages";
const transURL = "https://libretranslate.de/translate";

const Translate = () => {
	const [from, setFrom] = useState("en");
	const [to, setTo] = useState("en");
	const [input, setInput] = useState("");
	const [output, setOutput] = useState("");
	const [options, setOptions] = useState([]);

	//translate fn
	const translate = async () => {
		const params = new URLSearchParams();
		params.append("q", input);
		params.append("source", from);
		params.append("target", to);
		params.append("api_key", "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");

		const res = await axios.post(transURL, params, {
			headers: {
				accept: "application/json",
				"Content-Type": "application/x-www-form-urlencoded",
			},
		});
		const { translatedText } = res.data;
		setOutput(translatedText);
	};

	useEffect(() => {
		const fetchLang = async () => {
			const res = await axios.get(langURL, {
				headers: { accept: "application/json" },
			});
			setOptions(res.data);
		};
		fetchLang();
	}, []);
	return (
		<div className="translate">
			<div className="grid">
				<div className="card">
					<div className="selection">
						<div className="f">
							<b>From</b>
							<span>({from})</span>
						</div>
						<select onChange={(e) => setFrom(e.target.value)}>
							{options.map((o) => (
								<option key={o.code} value={o.code}>
									{o.name}
								</option>
							))}
						</select>
					</div>
					<div>
						<textarea
							cols="50"
							rows="10"
							onInput={(e) => setInput(e.target.value)}
							placeholder="Tap to enter text here..."></textarea>
					</div>
					<div className="translate-btn-option">
						<button
							className={`tn-btn ${!input ? "disabled" : ""}`}
							onClick={() => translate()}>
							Translate
						</button>
					</div>
				</div>

				<div className="card">
					<div className="selection">
						<div className="t">
							<b>To</b>
							<span> ({to}) </span>
						</div>
						<select onChange={(e) => setTo(e.target.value)}>
							{options.map((o) => (
								<option key={o.code} value={o.code}>
									{o.name}
								</option>
							))}
						</select>
					</div>

					<div>
						<textarea
							cols="50"
							rows="10"
							defaultValue={output}
							placeholder="Your translated text will appear here"></textarea>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Translate;
