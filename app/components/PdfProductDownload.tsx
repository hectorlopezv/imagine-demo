"use client";
import { Producto } from "@prisma/client";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    padding: "1cm",
  },
  title: {
    fontSize: 24,
    marginBottom: "0.5cm",
    fontWeight: "bold",
  },
  section: {
    marginBottom: "0.5cm",
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
  },
  value: {
    fontSize: 12,
  },
});
type Props = {
  product: Producto;
};
const PdfProductDownload = ({ product }: Props) => {
  const handleDownload = async () => {
    const pdfBlob = (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.title}>Product Inventory</Text>

          <View style={styles.section}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{product.nombre}</Text>
            <Text style={styles.label}>Quantity:</Text>
            <Text style={styles.value}>{product.cantidad}</Text>
            <Text style={styles.label}>Price:</Text>
            <Text style={styles.value}>{product.precio}</Text>
            <Text style={styles.label}>Description:</Text>
            <Text style={styles.value}>{product.descripcion}</Text>
          </View>
        </Page>
      </Document>
    ) as any;
    const blobPromise = await pdf(pdfBlob).toBlob();

    saveAs(blobPromise, `${product.nombre}` + ".pdf");
  };

  return (
    <div>
      <h1>Product Inventory</h1>
      <button onClick={handleDownload}>Download PDF</button>
    </div>
  );
};

export default PdfProductDownload;
