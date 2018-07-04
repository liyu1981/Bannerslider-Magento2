<?php
/**
 * Copyright @ LiveWise.
 */
namespace Magestore\Bannerslider\Setup;

use Magento\Framework\Setup\UpgradeSchemaInterface;
use Magento\Framework\Setup\ModuleContextInterface;
use Magento\Framework\Setup\SchemaSetupInterface;

class UpgradeSchema implements  UpgradeSchemaInterface
{
    public function upgrade(SchemaSetupInterface $setup, ModuleContextInterface $context) {
        $setup->startSetup();

        if (version_compare($context->getVersion(), '1.8.1') < 0) {

          $tableName = $setup->getTable('magestore_bannerslider_banner');
          if ($setup->getConnection()->isTableExists($tableName) == true) {

              $new_columns = [
                  'gsap_animation_dom' => [
                      'type' => \Magento\Framework\DB\Ddl\Table::TYPE_TEXT,
                      'nullable' => true, 
                      'default' => null,
                      'comment' => 'GSAP Animation DOM'
                  ],
                  'gsap_animation_js' => [
                      'type' => \Magento\Framework\DB\Ddl\Table::TYPE_TEXT,
                      'nullable' => true, 
                      'default' => null,
                      'comment' => 'GSAP Animation JS'
                  ]
              ];

              $connection = $setup->getConnection();
              foreach ($new_columns as $name => $definition) {
                  $connection->addColumn($tableName, $name, $definition);
              }

            }
        }

        $setup->endSetup();
    }
}
