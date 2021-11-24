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
	const [activeVoice] = useState("Voice is activated, speak now");
	const [active, setActive] = useState(false);

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

	const SpeechRecognition =
		window.SpeechRecognition || window.webkitSpeechRecognition;
	const recognition = new SpeechRecognition();

	recognition.onstart = function () {
		setActive(!active);
	};

	const activateMic = () => {
		recognition.start();
	};

	recognition.onresult = function (e) {
		const current = e.resultIndex;
		const transcript = e.results[current][0].transcript;
		console.log(transcript);
		setInput(transcript);
		setActive(false);
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
		<div className={`translate ${active ? "activated" : "not-active"}`}>
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
							value={input}
							onInput={(e) => setInput(e.target.value)}
							placeholder="Tap to enter text here..."></textarea>
					</div>
					<div className="translate-btn-option">
						{input && (
							<>
								<button className="tn-btn" onClick={() => translate()}>
									Translate
								</button>
								<button className="tn-btn" onClick={() => setInput("")}>
									clear
								</button>
							</>
						)}

						{!input && (
							<div className="mic" onClick={activateMic}>
								<i className="material-icons">mic</i>
							</div>
						)}
					</div>
					<div className="active-voice">
						<p>{activeVoice}</p>
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
							value={output}
							onChange={console.log("hello dear")}
							placeholder="Your translated text will appear here"></textarea>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Translate;
