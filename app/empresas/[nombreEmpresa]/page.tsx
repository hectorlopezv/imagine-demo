import getProducts from "@/app/actions/getProducts";
import EmptyState from "@/app/components/EmptyState";
import ProductoList from "./componentes/ProductosList";
import ProductListHeader from "./componentes/HeaderProductList";
import EditEmpresa from "@/app/components/EditEmpresa";

type Props = {
  params: {
    nombreEmpresa: string;
  };
};

export default async function ProductosPage({
  params: { nombreEmpresa },
}: Props) {
  const products = await getProducts(nombreEmpresa);

  if (!products) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <div
          className="bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4
      lg:px-6 justify-between items-center
      shadow-sm font-medium text-sm text-neutral-800"
        >
          <div className="flex justify-between w-full">
            <ProductListHeader nombreEmpresa={nombreEmpresa} />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <ProductoList products={products} />
        </div>
   
      </div>
    </div>
  );
}
