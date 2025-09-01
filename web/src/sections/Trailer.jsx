export default function Trailer() {
    return (
        <div>
            <section

                id="trailer"
                className="relative w-full h-[800px] bg-black flex items-center justify-center"
            >
                <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/Y-x0efG1seA"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>


            </section>
        </div>

    );
}
