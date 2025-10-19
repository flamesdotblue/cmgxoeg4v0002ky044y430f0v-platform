import Spline from '@splinetool/react-spline';

export default function HeroCover() {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/5EwoDiC2tChvmy4K/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-blue-900/10 to-white pointer-events-none" />
      <div className="relative z-10 h-full flex items-center">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-3xl md:text-5xl font-semibold text-white drop-shadow-sm">
            Protein Tracker
          </h1>
          <p className="mt-3 md:mt-4 text-white/90 md:text-lg max-w-2xl">
            Log your meals, track daily protein, and hit your goals with a clean, modern interface.
          </p>
        </div>
      </div>
    </section>
  );
}
