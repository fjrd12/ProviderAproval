sap.ui.define([
	"jquery.sap.global",
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"sap/m/UploadCollectionParameter",
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function (jQuery, Controller, MessageBox, MessageToast, UploadCollectionParameter, JSONModel, Device) {
	"use strict";

	return Controller.extend("Provider.evaluation.ProviderEvaluation.controller.FileUploader", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf Provider.evaluation.ProviderEvaluation.view.FileUploader
		 */
		onInit: function () {
			this.getView().setModel(new JSONModel(Device), "device");
		},
		onChange: function (oEvent) {
			var oUploadCollection = oEvent.getSource();
			// Header Token
			var oCustomerHeaderToken = new UploadCollectionParameter({
				name: "x-csrf-token",
				value: "securityTokenFromModel"
			});
			oUploadCollection.addHeaderParameter(oCustomerHeaderToken);
		},
		onStartUpload: function (oEvent) {
			var oUploadCollection = this.byId("UploadCollection");
			var cFiles = oUploadCollection.getItems().length;
			var uploadInfo = cFiles + " file(s)";
            
			if (cFiles > 0) {
				oUploadCollection.upload();
				MessageToast.show("Method Upload is called (" + uploadInfo + ")");
				MessageBox.information("Uploaded " + uploadInfo);
			}
			else{
			    MessageToast.show("{i18n>nofiles}");	
			}
			
		},
		onBeforeUploadStarts: function (oEvent) {
			// Header Slug
			var oCustomerHeaderSlug = new UploadCollectionParameter({
				name: "slug",
				value: oEvent.getParameter("fileName")
			});
			oEvent.getParameters().addHeaderParameter(oCustomerHeaderSlug);
			/*				setTimeout(function () {
								MessageToast.show("Event beforeUploadStarts triggered");
							}, 4000);
			*/
		},
		onUploadComplete: function (oEvent) {
			var sUploadedFileName = oEvent.getParameter("files")[0].fileName;
			setTimeout(function () {
				var oUploadCollection = this.byId("UploadCollection");

				for (var i = 0; i < oUploadCollection.getItems().length; i++) {
					if (oUploadCollection.getItems()[i].getFileName() === sUploadedFileName) {
						oUploadCollection.removeItem(oUploadCollection.getItems()[i]);
						break;
					}
				}
			}.bind(this), 4000);
		},
		onSelectChange: function (oEvent) {
			var oUploadCollection = this.byId("UploadCollection");
			oUploadCollection.setShowSeparators(oEvent.getParameters().selectedItem.getProperty("key"));
		},
		onFileDeleted: function (oEvent) {
			MessageToast.show("Event fileDeleted triggered");
		},

		onFilenameLengthExceed: function (oEvent) {
			MessageToast.show("Event filenameLengthExceed triggered");
		},

		onFileSizeExceed: function (oEvent) {
			MessageToast.show("Event fileSizeExceed triggered");
		},

		onTypeMissmatch: function (oEvent) {
			MessageToast.show("Event typeMissmatch triggered");
		}
		//,

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf Provider.evaluation.ProviderEvaluation.view.FileUploader
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf Provider.evaluation.ProviderEvaluation.view.FileUploader
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf Provider.evaluation.ProviderEvaluation.view.FileUploader
		 */
		//	onExit: function() {
		//
		//	}

	});

});