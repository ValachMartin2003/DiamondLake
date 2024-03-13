<?php
declare(strict_types=1);

// Using namespaces aliasing
use Util\Util as Util;
use Database\Database as Database;

// Set environment
require_once('../../common/php/environment.php');

// Get arguments
$args = Util::getArgs();

// Connect to database
$db = new Database();

// Set query (Check new email already exist)
$query = "SELECT `id` 
					 	FROM `users` 
					 WHERE `email` = ?
					 LIMIT 1;";

// Execute query with argument
$result = $db->execute($query, array($args['email']));

// Check result
if (!is_null($result)) {

	// Set error
	Util::setError('Ezen az email címen már létezik egy felhasználó!', $db);
}

// Set default user type
$args['type'] = 'U';

// Set query
$query = "INSERT INTO `users` 
					(`" . implode("`,`", array_keys($args)) . "`) 
					VALUES";

// Execute query
$result = $db->execute($query, $args);

// Close connection
$db = null;

// Check not success
if (!$result['affectedRows']) {

	// Set error
	Util::setError('A regisztráció nem sikerült!');
}

// Set result
$result = array("id" => $result['lastInsertId']);

// Set response
Util::setResponse($result);