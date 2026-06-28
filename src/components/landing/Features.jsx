import {
  MapPinned,
  Database,
  ShieldCheck,
  BarChart3,
  Leaf,
  Users,
} from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <MapPinned size={36} />,
      title: "Live Community Map",
      desc: "Visualize waste reports across the campus in real time using interactive maps.",
    },
    {
      icon: <Database size={36} />,
      title: "Cloud Storage",
      desc: "Every waste report is securely stored in Firebase and synced instantly.",
    },
    {
      icon: <ShieldCheck size={36} />,
      title: "Verified Reporting",
      desc: "Community verification ensures reliable waste reporting and reduces false submissions.",
    },
    {
      icon: <BarChart3 size={36} />,
      title: "Smart Analytics",
      desc: "Track waste trends, environmental impact, and category-wise insights with live dashboards.",
    },
    {
      icon: <Leaf size={36} />,
      title: "Environment Score",
      desc: "Measure sustainability performance through an intelligent environmental scoring system.",
    },
    {
      icon: <Users size={36} />,
      title: "Community Driven",
      desc: "Encourage students and communities to actively participate in keeping the campus clean.",
    },
  ];

  return (
    <section
      id="features"
      className="relative px-8 py-28"
    >
      <div className="mx-auto max-w-7xl">

        {/* Heading */}

        <div className="mb-16 text-center">

          <p className="mb-3 text-green-400 font-semibold tracking-widest uppercase">
            Features
          </p>

          <h2 className="text-5xl font-black text-white">
            Everything You Need
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-400">
            EcoAudit combines real-time monitoring, smart analytics and
            community participation into one intelligent waste management
            platform.
          </p>

        </div>

        {/* Cards */}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {features.map((feature, index) => (

            <div
              key={index}
              className="group rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-green-400/40 hover:bg-white/[0.06] hover:shadow-[0_0_35px_rgba(34,197,94,.20)]"
            >

              <div className="mb-6 inline-flex rounded-2xl bg-green-400/10 p-4 text-green-400 transition group-hover:scale-110">
                {feature.icon}
              </div>

              <h3 className="mb-4 text-2xl font-bold text-white">
                {feature.title}
              </h3>

              <p className="leading-7 text-gray-400">
                {feature.desc}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}