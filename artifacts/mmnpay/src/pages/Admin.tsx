// Minimal placeholder for the future Admin Dashboard. Its only purpose
// today is to exist behind the super_admin-only route guard so the
// role-based access system can be exercised end-to-end; the real admin UI
// is a separate, later piece of work.
export default function Admin() {

  return (

    <div className="min-h-screen bg-[#0a2540] flex items-center justify-center p-6">

      <div className="bg-white rounded-2xl shadow p-10 text-center max-w-md">

        <h1 className="text-2xl font-bold text-[#0a2540] mb-2">
          Admin
        </h1>

        <p className="text-gray-500">
          Super admin access confirmed. The full admin dashboard is coming soon.
        </p>

      </div>

    </div>

  );

}
