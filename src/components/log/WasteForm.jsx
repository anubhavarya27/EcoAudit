import { useState } from "react";
import {
  Upload,
  MapPin,
  Trash2,
  Weight,
  Building2,
  FileText,
} from "lucide-react";

import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  getDoc,
} from "firebase/firestore";

import { db, auth } from "../../firebase/firebase";

export default function WasteForm() {
  const [image, setImage] = useState(null);

  const [category, setCategory] = useState("Plastic");
  const [weight, setWeight] = useState("");
  const [community, setCommunity] = useState("Hostel A");
  const [description, setDescription] = useState("");

  const [location, setLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported.");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        setLoadingLocation(false);
      },
      () => {
        alert("Unable to get your location.");
        setLoadingLocation(false);
      }
    );
  };

  const handleSubmit = async () => {
  if (!weight) {
    alert("Please enter the weight.");
    return;
  }

  if (!location) {
    alert("Please detect your location.");
    return;
  }

  try {
    setSubmitting(true);

    // Fetch username
    const userRef = doc(db, "users", auth.currentUser.uid);
    const userSnap = await getDoc(userRef);

    let username = "Unknown";

    if (userSnap.exists()) {
      username = userSnap.data().username;
    }
    const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));

const userData = userDoc.data();

    await addDoc(collection(db, "wasteReports"), {
      username,
      userEmail: auth.currentUser.email,
userName: userData.username,
      category,
      weight: Number(weight),
      community,
      description,
      latitude: location.latitude,
      longitude: location.longitude,
      status: "Pending",
      createdAt: serverTimestamp(),
    });

    alert("Waste report submitted successfully!");

    setCategory("Plastic");
    setWeight("");
    setCommunity("Hostel A");
    setDescription("");
    setImage(null);
    setLocation(null);

  } catch (error) {
    console.error(error);
    alert("Failed to submit report.");
  } finally {
    setSubmitting(false);
  }
};

  return (
    <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-[#161B22] p-8 shadow-xl">

  {/* Heading */}
  <div className="mb-8">
    <h2 className="text-3xl font-bold text-white">
      Waste Report
    </h2>

    <p className="mt-2 text-gray-400">
      Upload waste details for verification and environmental analytics.
    </p>
  </div>

  {/* Image Upload */}
  <div className="mb-8">

    <label className="mb-3 flex items-center gap-2 font-semibold text-gray-300">
      <Upload size={18} />
      Upload Image
    </label>

    <label className="flex h-52 cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-green-500/30 bg-[#0D1117] transition-all duration-300 hover:border-green-400 hover:bg-[#111821]">

      {image ? (
        <img
          src={URL.createObjectURL(image)}
          alt="Preview"
          className="h-full w-full rounded-2xl object-cover"
        />
      ) : (
        <div className="text-center">

          <Upload
            size={50}
            className="mx-auto mb-4 text-green-400"
          />

          <p className="text-lg font-semibold text-white">
            Click to Upload
          </p>

          <p className="text-sm text-gray-400">
            JPG, PNG or JPEG
          </p>

        </div>
      )}

      <input
        hidden
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

    </label>

  </div>

  {/* Form */}
  <div className="grid gap-6 md:grid-cols-2">

    {/* Category */}
    <div>

      <label className="mb-2 flex items-center gap-2 font-medium">
        <Trash2 size={18} />
        Waste Category
      </label>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-[#0D1117] p-4 text-white outline-none transition focus:border-green-500"
      >
        <option>Plastic</option>
        <option>Paper</option>
        <option>Metal</option>
        <option>Glass</option>
        <option>Organic</option>
        <option>E-Waste</option>
        <option>Other</option>
      </select>

    </div>

    {/* Weight */}
    <div>

      <label className="mb-2 flex items-center gap-2 font-medium">
        <Weight size={18} />
        Weight (kg)
      </label>

      <input
        type="number"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        placeholder="2.5"
        className="w-full rounded-xl border border-white/10 bg-[#0D1117] p-4 text-white outline-none transition focus:border-green-500"
      />

    </div>

    {/* Community */}
    <div>

      <label className="mb-2 flex items-center gap-2 font-medium">
        <Building2 size={18} />
        Community
      </label>

      <select
        value={community}
        onChange={(e) => setCommunity(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-[#0D1117] p-4 text-white outline-none transition focus:border-green-500"
      >
        <option>Hostel A</option>
        <option>Hostel B</option>
        <option>Library</option>
        <option>Academic Block</option>
        <option>Food Court</option>
        <option>Parking</option>
        <option>Other</option>
      </select>

    </div>

    {/* GPS */}
    <div>

      <label className="mb-2 flex items-center gap-2 font-medium">
        <MapPin size={18} />
        Location
      </label>

      <button
        type="button"
        onClick={detectLocation}
        className="w-full rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 p-4 font-semibold text-black transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-green-500/30"
      >
        {loadingLocation
          ? "Detecting..."
          : location
          ? "Location Detected ✓"
          : "Detect Current Location"}
      </button>

      {location && (
        <p className="mt-3 text-sm text-green-400">
          {location.latitude.toFixed(5)},{" "}
          {location.longitude.toFixed(5)}
        </p>
      )}

    </div>

  </div>
        {/* Description */}
      <div className="mt-8">

        <label className="mb-2 flex items-center gap-2 font-medium">
          <FileText size={18} />
          Description
        </label>

        <textarea
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the waste..."
          className="w-full rounded-xl border border-white/10 bg-[#0D1117] p-4 text-white outline-none transition focus:border-green-500"
        />

      </div>

      {/* Submit */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={submitting}
        className="mt-10 w-full rounded-2xl bg-gradient-to-r from-green-500 to-emerald-400 py-4 text-lg font-semibold text-black shadow-lg shadow-green-500/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-green-500/40 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Submitting..." : "Submit Waste Report"}
      </button>

    </div>
  );
}