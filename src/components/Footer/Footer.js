import React from 'react';
import Icon from 'components/Icon';
import svgTwitter 	from 'images/icons/tw.svg';
import svgInstagram from 'images/icons/inst.svg';
import svgFacebook 	from 'images/icons/fb.svg';

import './Footer.scss';

class Footer extends React.Component {
	render() {
		return (
			<footer className ="footer">
				<div className = "footer__info">
					<div className = "footer__info__copirandref">
						<div className = "footer__info__copirandref__copyright">
							© 2017 Isina Inc.
						</div>
						<div className = "footer__info__copirandref__referense">
							<a href="/terms-of-use" target="_self"> Terms of Use </a> /
							<a href="/privacy-notice" target="_self"> Privacy Notice </a> /
							<a href="/official-rules" target="_self"> Official Rules </a>
						</div>
					</div>
					<div className = "footer__info__contact">
						<div className = "footer__info__contact__dev">+1-844-234-7462</div>
						<div className = "footer__info__contact__dev">info@isina.com</div>
					</div>
				</div>
				<div className = "footer__socialReferences">
					<div className = "footer__socialReferences__dev">
						<a href = "https://twitter.com/isinaofficial/">
							<Icon
								className="HomePage__icon"
								src={svgTwitter}
							/>
						</a>
					</div>
					<div  className = "footer__socialReferences__dev">
						<a href = "https://www.facebook.com/ISINAofficial/">
							<Icon
								className="HomePage__icon"
								src={svgFacebook}
							/>
						</a>
					</div>
					<div  className = "footer__socialReferences__dev">
						<a href = "https://www.instagram.com/isinaofficial/">
							<Icon
								className="HomePage__icon"
								src={svgInstagram}
							/>
						</a>
					</div>
				</div>
			</footer>
		);
	}
}
export default Footer;
