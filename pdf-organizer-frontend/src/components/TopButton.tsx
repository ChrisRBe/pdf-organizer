export default function TopButton({}) {
    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className="fixed bottom-10 right-10 ">
            <button onClick={goToTop}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    shape-rendering="geometricPrecision"
                    text-rendering="geometricPrecision"
                    image-rendering="optimizeQuality"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    viewBox="0 0 512 512"
                    width="50px"
                    height="50px"
                    className="transform fill-blue-500"
                >
                    <path d="M512 256c0 70.67-28.66 134.69-74.98 181.02C390.69 483.34 326.68 512 256 512s-134.69-28.66-181.02-74.98C28.66 390.69 0 326.67 0 256c0-70.68 28.66-134.69 74.98-181.01C121.31 28.66 185.32 0 256 0c70.67 0 134.69 28.66 181.02 74.99C483.34 121.31 512 185.32 512 256zm-160.23 21.5h-43.38v67.93c0 7.63-6.27 13.9-13.91 13.9H217.5c-7.62 0-13.9-6.25-13.9-13.9v-67.92h-43.41c-16.71 0-25.11-19.9-14.05-31.96l96.01-112.04c7.54-9.12 21.31-9.13 29.04-.38l94.96 112.8c10.83 12.43 1.66 31.55-14.38 31.57z" />
                </svg>
            </button>
        </div>
    );
}
