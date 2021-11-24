import React from "react";
import "./app.scss";
import Header from "./components/Header";
import Translate from "./components/Translate";

const App = () => {
	return (
		<div className="App">
			<div className="center">
				<Header />
				<Translate />
				<footer>
					<b style={{ color: "#037fff" }}>Transcriber INC.</b>
					<p>
						Contact the developer via <b>Portfolio</b>{" "}
						<a
							href="https://dprincecoder.codes/"
							target="_blank"
							rel="noreferrer noopener">
							Here
						</a>
					</p>
					<p>all rights reserved 2021.</p>
				</footer>
			</div>
		</div>
	);
};

export default App;
