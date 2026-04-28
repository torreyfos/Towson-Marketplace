

const AboutUs = function () {
    


    return (

        <div className = "container">

            <div className = "about-section">
                <h2>About Us</h2>
                <p>Our goal with Towson Marketplace is to create a digital space where Towson students can sell and offer items to each other. These items may otherwise require students to travel off campus to purchase or pay higher prices at retail stores.</p>
                <p>Due to Towson Marketplace being campus restricted, it creates a safe and trusted environment that other marketplace options cannot guarantee. It is also a way for students to efficiently use their money such that it won't interrupt their personal and academic schedules.</p>
            </div>

            <div className = "team-section">
                <h2>Meet the Team</h2>
                <div className = "team-grid">

                <div className = "team-card">
                    <div className = "team-avatar">TW</div>
                    <p className = "team-name">Taylor Williams</p>
                    <a href="https://github.com/Tay-Williams" target="_blank" className = "github-link">GitHub</a>
                </div>

                <div className = "team-card">
                    <div className = "team-avatar">TF</div>
                    <p className = "team-name">Torrey Foster</p>
                    <a href="https://github.com/torreyfos" target="_blank" className = "github-link">GitHub</a>
                </div>

                <div className = "team-card">
                    <div className = "team-avatar">BA</div>
                    <p className = "team-name">Beatrice Amoako-Dua</p>
                    <a href="https://github.com/BeatriceD2603" target="_blank" className = "github-link">GitHub</a>
                </div>

                <div className = "team-card">
                    <div className = "team-avatar">JM</div>
                    <p className = "team-name">Justice Moody</p>
                    <a href="https://github.com/Justicem04" target="_blank" className = "github-link">GitHub</a>
                </div>

                <div className = "team-card">
                    <div className = "team-avatar">BN</div>
                    <p className = "team-name">Bryan Nchoutpouen</p>
                    <a href="https://github.com/bnchout1105" target="_blank" className = "github-link">GitHub</a>
                </div>

                </div>
            </div>

        </div>
    )
}

export default AboutUs;