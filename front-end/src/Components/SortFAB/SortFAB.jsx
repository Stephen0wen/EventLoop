import "./SortFAB.css";
import { useState, useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { DisplayContext } from "../../Contexts/DisplayContext";
import { UserContext } from "../../Contexts/UserContext";
import ClickAwayListener from "react-click-away-listener";

export default function SortFAB() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isExpanded, setIsExpanded] = useState(false);
    const { isLoggedIn } = useContext(UserContext);
    const { isWide } = useContext(DisplayContext);
    const [sort_by, setSort_by] = useState("event_id");
    const [order, setOrder] = useState("desc");

    useEffect(() => {
        const tempSort_by = searchParams.get("sort_by") || "event_id";
        const tempOrder = searchParams.get("order") || "desc";
        setSort_by(tempSort_by);
        setOrder(tempOrder);
    }, [searchParams]);

    const updateSortBy = (e) => {
        const { value } = e.target;
        const newParams = new URLSearchParams(searchParams);
        newParams.set("sort_by", value);
        setSearchParams(newParams);
    };

    const updateOrder = (e) => {
        const { value } = e.target;
        const newParams = new URLSearchParams(searchParams);
        newParams.set("order", value);
        setSearchParams(newParams);
    };

    const FAB = (
        <button
            className={
                isWide || !isLoggedIn ? "fab fab-top-nav" : "fab fab-bottom-nav"
            }
            onClick={() => {
                setIsExpanded(true);
            }}
            onMouseEnter={() => {
                setIsExpanded(true);
            }}
        >
            <img src="/sort-svgrepo-com.svg" />
            <p>Sort</p>
        </button>
    );

    const SortMenu = (
        <ClickAwayListener
            onClickAway={() => {
                setIsExpanded(false);
            }}
        >
            <div
                id="sort-menu"
                className={
                    isWide || !isLoggedIn ? "fab-top-nav" : "fab-bottom-nav"
                }
                onMouseLeave={() => {
                    setIsExpanded(false);
                }}
            >
                <h2>Sort By:</h2>
                <fieldset id="sort-by">
                    <label>
                        Date Created
                        <input
                            id="sort-id"
                            type="radio"
                            name="sort-by"
                            value="event_id"
                            checked={sort_by === "event_id"}
                            onChange={updateSortBy}
                        />
                    </label>
                    <label>
                        Title
                        <input
                            id="sort-title"
                            type="radio"
                            name="sort-by"
                            value="event_title"
                            checked={sort_by === "event_title"}
                            onChange={updateSortBy}
                        />
                    </label>
                    <label>
                        Event Date
                        <input
                            id="sort-start"
                            type="radio"
                            name="sort-by"
                            value="event_start"
                            checked={sort_by === "event_start"}
                            onChange={updateSortBy}
                        />
                    </label>
                </fieldset>
                <h2>Order:</h2>
                <fieldset id="order">
                    <label>
                        Ascending
                        <input
                            id="order-asc"
                            type="radio"
                            name="order"
                            value="asc"
                            checked={order === "asc"}
                            onChange={updateOrder}
                        />
                    </label>
                    <label>
                        Descending
                        <input
                            id="order-desc"
                            type="radio"
                            name="order"
                            value="desc"
                            checked={order === "desc"}
                            onChange={updateOrder}
                        />
                    </label>
                </fieldset>
            </div>
        </ClickAwayListener>
    );

    if (!isExpanded) return FAB;
    else return SortMenu;
}
