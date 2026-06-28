import {
  Leaf,
  BarChart3,
  MapPinned,
  Users,
} from "lucide-react";

export default function About() {
  const stats = [
    {
      icon: <Leaf size={28} />,
      title: "Real-Time Reporting",
      desc: "Submit waste reports instantly with live updates.",
    },
    {
      icon: <MapPinned size={28} />,
      title: "Interactive Maps",
      desc: "Visualize waste locations across the campus.",
    },
    {
      icon: <BarChart3 size={28} />,
      title: "Smart Analytics",
      desc: "Analyze trends and monitor environmental impact.",
    },
    {
      icon: <Users size={28} />,
      title: "Community Participation",
      desc: "Empower everyone to contribute towards a cleaner future.",
    },
  ];

  return (
    <section
      id="about"
      className="relative px-8 py-28"
    >
      <div className="mx-auto max-w-7xl">

        {/* Heading */}

        <div className="mb-16 text-center">

          <p className="mb-3 font-semibold uppercase tracking-[0.25em] text-green-400">
            About EcoAudit
          </p>

          <h2 className="text-5xl font-black text-white">
            Built for a Cleaner Tomorrow
          </h2>

          <p className="mx-auto mt-6 max-w-4xl text-lg leading-8 text-gray-400">
            EcoAudit is an intelligent waste management platform designed
            to help campuses and communities monitor waste generation,
            encourage responsible disposal and promote sustainable
            environmental practices through real-time reporting,
            interactive mapping and insightful analytics.
          </p>

        </div>

        {/* Cards */}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {stats.map((item, index) => (

            <div
              key={index}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-green-400/40 hover:bg-white/[0.06] hover:shadow-[0_0_35px_rgba(34,197,94,.18)]"
            >

              <div className="mb-5 inline-flex rounded-2xl bg-green-400/10 p-4 text-green-400">
                {item.icon}
              </div>

              <h3 className="mb-4 text-2xl font-bold text-white">
                {item.title}
              </h3>

              <p className="leading-7 text-gray-400">
                {item.desc}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}