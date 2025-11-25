.. code-block:: shell 
   
   locals {
     tags = {
          CreatedBy = "Terraform"
          Owner     = var.owner
          Module    = "tf-example-oidc-azure"
          Name      = var.project_name
     }
   }

   resource "azurerm_resource_group" "this" {
     name     = var.project_name
     location = var.location
     tags     = local.tags
   }

   resource "azurerm_virtual_network" "this" {
     name                = var.project_name
     address_space       = ["10.0.0.0/16"]
     location            = azurerm_resource_group.this.location
     resource_group_name = azurerm_resource_group.this.name
     tags                = local.tags
   }

   resource "azurerm_subnet" "internal" {
     name                 = "internal"
     resource_group_name  = azurerm_resource_group.this.name
     virtual_network_name = azurerm_virtual_network.this.name
     address_prefixes     = ["10.0.2.0/24"]
   }

   resource "azurerm_public_ip" "vm-public-ip" {
     name                = "public-ip-${var.project_name}"
     location            = var.location
     resource_group_name = azurerm_resource_group.this.name
     allocation_method   = "Dynamic"
     domain_name_label   = var.project_name
     tags                = local.tags
   }

   resource "azurerm_network_interface" "this" {
     name                = "ip-${var.project_name}"
     location            = var.location
     resource_group_name = azurerm_resource_group.this.name
     tags                = local.tags

     ip_configuration {
          subnet_id                     = azurerm_subnet.internal.id
          name                          = "public"
          private_ip_address_allocation = "Dynamic"
          public_ip_address_id          = azurerm_public_ip.vm-public-ip.id
     }
   }

   resource "azurerm_user_assigned_identity" "this" {
     location            = var.location
     name                = var.project_name
     resource_group_name = azurerm_resource_group.this.name
     tags                = local.tags
   }

   resource "azurerm_linux_virtual_machine" "this" {
     name                  = var.project_name
     resource_group_name   = azurerm_resource_group.this.name
     location              = var.location
     size                  = "Standard_F2"
     admin_username        = var.vm_admin_username
     custom_data           = data.cloudinit_config.this.rendered
     network_interface_ids = [azurerm_network_interface.this.id]
     tags                  = local.tags

     admin_ssh_key {
          username   = var.vm_admin_username
          public_key = var.ssh_public_key
     }

     source_image_reference {
          publisher = "Canonical"
          offer     = "0001-com-ubuntu-server-jammy"
          sku       = "22_04-lts"
          version   = "latest"
     }

     os_disk {
          storage_account_type = "Standard_LRS"
          caching              = "ReadWrite"
          disk_size_gb         = 30
     }

     identity {
          type = "UserAssigned"
          identity_ids = [azurerm_user_assigned_identity.this.id]
     }
   }
