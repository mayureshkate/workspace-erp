import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function InventoryPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const products = [
    { id: "SKU-1001", name: "Ergonomic Office Chair", stock: 45, status: "In Stock", price: "$299.99" },
    { id: "SKU-1002", name: "Mechanical Keyboard", stock: 12, status: "Low Stock", price: "$149.50" },
    { id: "SKU-1003", name: "Wireless Mouse", stock: 0, status: "Out of Stock", price: "$79.99" },
    { id: "SKU-1004", name: "Dual Monitor Stand", stock: 89, status: "In Stock", price: "$55.00" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-purple-500">
            Inventory & Assets
          </h1>
          <p className="mt-2 text-slate-400">
            Synced with Google Photos for instant visual asset verification.
          </p>
        </div>
        <button className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 rounded-lg text-purple-200 transition-colors">
          Add New Product
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="rounded-2xl bg-white/5 border border-glass-border overflow-hidden backdrop-blur-sm group hover:border-purple-500/50 transition-colors cursor-pointer">
            {/* Mock Image via Google Photos API concept */}
            <div className="h-48 bg-slate-800/80 flex items-center justify-center relative overflow-hidden">
              <svg className="w-12 h-12 text-slate-600 group-hover:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <div className="absolute top-3 right-3">
                <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                  product.status === 'In Stock' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                  product.status === 'Low Stock' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                  'bg-red-500/20 text-red-300 border border-red-500/30'
                }`}>
                  {product.status}
                </span>
              </div>
            </div>
            <div className="p-5">
              <div className="text-xs text-slate-500 mb-1">{product.id}</div>
              <h3 className="text-lg font-semibold text-slate-200 mb-3">{product.name}</h3>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Stock: <span className="text-white">{product.stock}</span></span>
                <span className="font-medium text-purple-300">{product.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
