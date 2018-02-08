import React from 'react';
import Icon from 'components/Icon';
import svgTwitter 	from 'images/icons/tw.svg';
import svgInstagram from 'images/icons/inst.svg';
import svgFacebook 	from 'images/icons/fb.svg';

class Footer extends React.Component {
	render() {
		return (
			<div className = "home-container">
				<div className ="copyright">
					<div className = "home-table v-align">
						<div className = "home-cell">
							© 2017 Isina Inc.
							<span className = "footer-links">
								<a href="/terms-of-use" target="_self"> Terms of Use </a> /
								<a href="/privacy-notice" target="_self"> Privacy Notice </a> /
								<a href="/official-rules" target="_self"> Official Rules </a>
							</span>
						</div>
					</div>
					<div className = "footer__contacts">
						<a href="tel:+18442347462" className ="footer__contacts-phone" target="_self">+1-844-234-7462</a>
						<a href="mailto:info@isina.com" className ="footer__contacts-email" target="_self">info@isina.com</a>
					</div>
				</div>
				<div className = "socialclass">
					<ul className ="social">
						<li className ="social__el">
							<a href = "https://twitter.com/isinaofficial/" target="_self">
								<Icon
									className="HomePage__icon"
									src={svgTwitter}
								/>
							</a>
						</li>
						<li className ="social__el">
							<a href = "https://www.facebook.com/ISINAofficial/" target="_self">
								<Icon
									className="HomePage__icon"
									src={svgFacebook}
								/>
							</a>
						</li>
						<li className ="social__el">
							<a href = "https://www.instagram.com/isinaofficial/" target="_self">
								<Icon
									className="HomePage__icon"
									src={svgInstagram}
								/>
							</a>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}
export default Footer;
