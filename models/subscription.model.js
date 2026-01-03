import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },

    price: {
      type: Number,
      required: [true, "Subscription Price is required"],
      min: [0, "Price must be greater than 0"],
    },

    currency: {
      type: String,
      enum: ["USD", "EUR", "GBP", "INR"],
      default: "INR",
    },

    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
      required: true,
    },

    category: {
      type: String,
      enum: [
        "sports",
        "entertainment",
        "technology",
        "finance",
        "utility",
        "other",
      ],
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "canceled", "expired"],
      default: "active",
    },

    startDate: {
      type: Date,
      required: [true, "Subscription Start Date is required"],
      validate: {
        validator: (value) => value <= new Date(),
        message: "Start Date cannot be in the future",
      },
    },

    renewalDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return !value || value > this.startDate;
        },
        message: "Renewal Date must be after Start Date",
      },
    },

    // Reference to User
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

/// ✅ PRE-SAVE HOOK (MUST BE OUTSIDE SCHEMA)

// Auto-calculate renewal date if missing

subscriptionSchema.pre("save", async function () {
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };

    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriods[this.frequency]
    );
  }

  // Auto-update the status if renewal date has passed
  if (this.renewalDate < new Date()) {
    this.status = "expired";
  }
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
