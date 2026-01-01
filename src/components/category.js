import card1 from '../images/card1.png'
import card2 from '../images/card2.png'
import card3 from '../images/card3.png'
import card4 from '../images/card4.png'
import card5 from '../images/card5.png'
import card6 from '../images/card6.png'
import './style.css'
import icon1 from '../images/ic1.png'
import icon2 from '../images/ic2.png'
import icon3 from '../images/ic3.png'
import icon4 from '../images/ic4.png'
import icon5 from '../images/ic5.png'
import icon6 from '../images/ic6.png'

const Category = () => {
    return (
        <div>
            <div class="browse">
                <p class="eyebrow">BROWSE CATEGORIES</p>
                <h1>Find What Inspires You</h1>
                <p class="subtitle">
                    Explore events across diverse categories. From electrifying music festivals
                    to transformative tech conferences.
                </p>
            </div>


            <div style={{
                display: 'flex', backgroundColor: 'black',
                flexWrap: 'wrap', justifyContent: 'center', justifyContent: 'space-around',
                paddingBottom:'40px'
            }}>
                <div className='card'><img src={card1}></img>
                    <div className='overlay'>
                        <div style={{ display: 'flex' }}>
                            <img style={{
                                width: '40px', height: '40px', borderRadius: '10px'
                            }} src={icon1}></img>
                            <div style={{ margin: '0px 20px', }}>
                                <h3 style={{ margin: '0px' }}>Entertainment</h3>
                                <p style={{ margin: '0px', color: '#a0aec0' }}>2,450 events</p>
                            </div>
                        </div>
                        <p style={{ color: '#a0aec0' }}>Concerts, DJ nights, comedy shows</p>
                    </div>
                </div>
                <div className='card'><img src={card2}></img>
                    <div className='overlay'>
                        <div style={{ display: 'flex' }}>
                            <img style={{
                                width: '40px', height: '40px', borderRadius: '10px'
                            }} src={icon2}></img>
                            <div style={{ margin: '0px 20px', }}>
                                <h3 style={{ margin: '0px' }}>Education</h3>
                                <p style={{ margin: '0px', color: '#a0aec0' }}>1,890 events</p>
                            </div>
                        </div>
                        <p style={{ color: '#a0aec0' }}>Workshps, seminars, training</p>
                    </div>
                </div>
                <div className='card'><img src={card3}></img>
                    <div className='overlay'>
                        <div style={{ display: 'flex' }}>
                            <img style={{
                                width: '40px', height: '40px', borderRadius: '10px'
                            }} src={icon3}></img>
                            <div style={{ margin: '0px 20px', }}>
                                <h3 style={{ margin: '0px' }}>Technology</h3>
                                <p style={{ margin: '0px', color: '#a0aec0' }}>980 events</p>
                            </div>
                        </div>
                        <p style={{ color: '#a0aec0' }}>Hackathons, AI events, meetups</p>
                    </div>
                </div>
                <div className='card'><img src={card4}></img>
                    <div className='overlay'>
                        <div style={{ display: 'flex' }}>
                            <img style={{
                                width: '40px', height: '40px', borderRadius: '10px'
                            }} src={icon4}></img>
                            <div style={{ margin: '0px 20px', }}>
                                <h3 style={{ margin: '0px' }}>Business</h3>
                                <p style={{ margin: '0px', color: '#a0aec0' }}>1,240 events</p>
                            </div>
                        </div>
                        <p style={{ color: '#a0aec0' }}>Networking, summits, launches</p>
                    </div>
                </div>
                <div className='card'><img src={card5}></img>
                    <div className='overlay'>
                        <div style={{ display: 'flex' }}>
                            <img style={{
                                width: '40px', height: '40px', borderRadius: '10px'
                            }} src={icon5}></img>
                            <div style={{ margin: '0px 20px', }}>
                                <h3 style={{ margin: '0px' }}>Sports & Fitness</h3>
                                <p style={{ margin: '0px', color: '#a0aec0' }}>760 events</p>
                            </div>
                        </div>
                        <p style={{ color: '#a0aec0' }}>Marathons, tournaments, cycling</p>
                    </div>
                </div>
                <div className='card'><img src={card6}></img>
                    <div className='overlay'>
                        <div style={{ display: 'flex' }}>
                            <img style={{
                                width: '40px', height: '40px', borderRadius: '10px'
                            }} src={icon6}></img>
                            <div style={{ margin: '0px 20px', }}>
                                <h3 style={{ margin: '0px' }}>Art & Culture</h3>
                                <p style={{ margin: '0px', color: '#a0aec0' }}>1,120 events</p>
                            </div>
                        </div>
                        <p style={{ color: '#a0aec0' }}>Exhibitions, craft fairs, shows</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Category