import db from "../config/db.config.js";

export const getAll = async (req, res) => {
  try {
    const data = await db.mutual_fund.findMany();

    res.status(200).json({
      status: true,
      data: data,
    });
  } catch (error) {
    console.error("Error fetching mutual funds:", error);
    res.status(500).json({
      status: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const getFundByISIN = async (req, res) => {
  const { isin } = req.params;
  try {
    const fund = await db.mutual_fund.findUnique({
      where: { ISIN: isin },
    });

    if (!fund) {
      return res
        .status(404)
        .json({ status: false, message: "Mutual fund not found" });
    }

    res.status(200).json({ status: true, fund });
  } catch (error) {
    console.error("Error fetching mutual fund:", error);
    res.status(500).json({
      status: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const getFundByCode = async (req, res) => {
  const { code } = req.params;
  try {
    const fund = await db.mutual_fund.findUnique({
      where: { code },
    });

    if (!fund) {
      return res
        .status(404)
        .json({ status: false, message: "Mutual fund not found" });
    }

    res.status(200).json({ status: true, fund });
  } catch (error) {
    console.error("Error fetching mutual fund:", error);
    res.status(500).json({
      status: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const getFundBySchemeCode = async (req, res) => {
  const { scheme_code } = req.params;
  try {
    const fund = await db.mutual_fund.findUnique({
      where: { scheme_code: Number(scheme_code) },
    });

    if (!fund) {
      return res
        .status(404)
        .json({ status: false, message: "Mutual fund not found" });
    }

    res.status(200).json({ status: true, fund });
  } catch (error) {
    console.error("Error fetching mutual fund:", error);
    res.status(500).json({
      status: false,
      message: error.message || "Internal Server Error",
    });
  }
};
