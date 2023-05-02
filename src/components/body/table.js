import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { format } from "date-fns/esm";
import getUnixTime from "date-fns/getUnixTime";
import fromUnixTime from "date-fns/fromUnixTime";
import { v4 as uuidv4 } from "uuid";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Alert from "./alert";
import FormSearch from "./form_search";
import './table.scss';
import "./modal.scss";
import "./button.scss";

const Table = (props) => {
    const [searchText, setSearchText] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const [komoditasValue, setKomoditasValue] = useState("");
    const [kotaValue, setKotaValue] = useState("");
    const [hargaValue, setHargaValue] = useState("");
    const [optionsArea, setOptionsArea] = useState();
    const [values, setValues] = useState([]);
    const [valuesSize, setValuesSize] = useState([]);
    const [optionsSize, setOptionsSize] = useState();

    const handleFilteredData = (event) => {
        const target = event.target;
        setSearchText(target.value);
    };

    useEffect(() => {
        fetch("https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/option_area")
            .then((data) => data.json())
            .then((val) => setValues(val));
    }, []);

    useEffect(() => {
        fetch("https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/option_size")
            .then((data) => data.json())
            .then((val) => setValuesSize(val));
    }, []);

    const filteredItems = () => {
        const { data } = props;
        // console.log(data);
        return data.filter(
            (item) =>
                (item.komoditas && item.komoditas.toLowerCase().includes(searchText.toLowerCase())) ||
                (item.area_kota && item.area_kota.toLowerCase().includes(searchText.toLowerCase())) ||
                (item.area_provinsi && item.area_provinsi.toLowerCase().includes(searchText.toLowerCase())) ||
                (item.price && item.price.toLowerCase().includes(searchText.toLowerCase())) ||
                (item.size && item.size.toLowerCase().includes(searchText.toLowerCase()))
        );
    };

    const formatDate = (date) => {
        return format(new Date(date), "dd - MMMM - yyyy");
    };

    const getDate = () => {
        return getUnixTime(new Date());
    };

    const parseDate = (unixTime) => {
        return fromUnixTime(unixTime);
    };


    const handleAlertOpen = () => {
        setShowAlert(true);
    };

    const handleAlertClose = () => {
        setShowAlert(false);
    };

    const handleAddData = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        switch (name) {
            case "komoditas":
                setKomoditasValue(value);
                break;
            case "provinsi":
                setOptionsArea(value);
                break;
            case "kota":
                setKotaValue(value);
                break;
            case "ukuran":
                setOptionsSize(value);
                break;
            case "harga":
                setHargaValue(value);
                break;

            default:
                break;
        }
    };

    const handleAddButton = () => {
        let date = getDate();

        props
            .addFishData({
                uuid: uuidv4(),
                komoditas: komoditasValue,
                area_provinsi: optionsArea,
                area_kota: kotaValue,
                size: optionsSize,
                price: hargaValue,
                tgl_parsed: parseDate(date),
                timestamp: date,
            })
            .then(() => {
                handleAlertOpen();
                setShowAlert(true);
                setKomoditasValue("");
                setOptionsArea("");
                setKotaValue("");
                setOptionsSize("");
                setHargaValue("");
                setInterval(() => {
                    setShowAlert(false);
                }, 3000);
            });
    };

    const layoutTableColumns = () => {
        return [
            {
                name: "uuid",
                selector: "uuid",
                omit: true,
                sortable: true,
            },
            {
                name: "Commodity",
                selector: "komoditas",
                sortable: true,
            },
            {
                name: "Province",
                selector: "area_provinsi",
                sortable: true,
            },
            {
                name: "City",
                selector: "area_kota",
                sortable: true,
            },
            {
                name: "Size",
                selector: "size",
                sortable: true,
            },
            {
                name: "Price",
                selector: "price",
                sortable: true,
                cell: (row) => <p>Rp {Number(row.price).toLocaleString(["ban", "id"])}</p>,
            },
            {
                name: "Created",
                selector: "tgl_parsed",
                sortable: true,
                cell: (row) => <p>{formatDate(row.tgl_parsed)}</p>,
            },
        ];
    };

    const layoutFilter = () => {
        return (

            <div className="title">
                <div className="sb__title">
                    <h2>List Commodity</h2>
                </div>

                <div className="sb__title-div">
                    <div className="sb__title-form">
                        <FormSearch searchText={searchText} handleFilteredData={(e) => handleFilteredData(e)} />
                    </div>
                    <div className="sb__title-btn">
                        <button className="sb__title-btn-btn" onClick={onOpenModal}>
                            Add Data
                        </button>
                    </div>
                </div>
            </div>

        );
    };

    return (
        <>
            <div className="table">
                <DataTable noHeader={true} subHeader subHeaderComponent={layoutFilter()} columns={layoutTableColumns()} data={filteredItems()} pagination paginationTotalRows={filteredItems().length} />

                <Modal open={open} onClose={onCloseModal} center>
                    <div className="modal">
                        <div className="bg__modal">
                            <h3 className="" id="modal-title">
                                Add Data
                            </h3>
                            <div className="bg__modal-form">
                                <div className="bg__modal-form-div">
                                    <label htmlFor="komoditas" className="">
                                        Comodity
                                    </label>
                                    <div className="">
                                        <input type="text" value={komoditasValue} onChange={(e) => handleAddData(e)} name="komoditas" id="komoditas" className="form2" placeholder="Comodity" />
                                    </div>
                                </div>
                                <div className="bg__modal-form-div">
                                    <label htmlFor="provinsi" className="">
                                        Province
                                    </label>
                                    <div className="">
                                        <select className="form" name="area_provinsi" onChange={(e) => setOptionsArea(e.target.value)}>
                                            <option>Choose Option</option>
                                            {values.map((opts, i) => (
                                                <option value={optionsArea} key={i}>
                                                    {opts.province}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="bg__modal-form-div">
                                    <label htmlFor="kota" className="">
                                        City
                                    </label>
                                    <div className="">
                                        <input type="text" value={kotaValue} onChange={(e) => handleAddData(e)} name="kota" id="kota" className="form2" placeholder="City" />
                                    </div>
                                </div>
                                <div className="bg__modal-form-div">
                                    <label htmlFor="ukuran" className="">
                                        Size
                                    </label>
                                    <div className="">
                                        <div>
                                            <select className="form" name="size" onChange={(e) => setOptionsSize(e.target.value)}>
                                                <option>Choose Option</option>
                                                {valuesSize.map((opts, i) => (
                                                    <option value={optionsSize} key={i}>
                                                        {opts.size}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        {/* <input type="text" value={ukuranValue} onChange={(e) => handleAddData(e)} name="ukuran" id="ukuran" className="form" placeholder="Size" /> */}
                                    </div>
                                </div>
                                <div className="bg__modal-form-div">
                                    <label htmlFor="harga" className="">
                                        Price
                                    </label>
                                    <div className="">
                                        <input type="text" value={hargaValue} onChange={(e) => handleAddData(e)} name="harga" id="harga" className="form2" placeholder="Price" />
                                    </div>
                                </div>

                                <Alert isOpened={showAlert} status="success" message="Data has been saved." onClose={(e) => handleAlertClose()} />
                            </div>
                        </div>
                        <div className="">
                            <button onClick={(e) => handleAddButton()} type="button" className="button-submit">
                                Save
                            </button>
                            <button onClose={onCloseModal} type="button" className="button-close">
                                Close
                            </button>
                        </div>
                    </div>
                </Modal >

            </div >
        </>
    );
};

export default Table;
