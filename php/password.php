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

// Set query
$query ="SELECT `password`,
								`valid`
					 FROM `users`
					WHERE `id` = ?
					LIMIT 1;";

// Execute query
$result = $db->execute($query, array($args['id']));

// Check not found
if (is_null($result)) {

	// Set error
	Util::setError("A felhasználó nem létezik!", $db);
}

// Simplifies result
$result = $result[0];

// Check user valid
if (!$result['valid']) {

	// Set error
	Util::setError("A felhasználó le van tiltva!");
}

// Check password
if ($result['password'] !== $args['password_current']) {

	// Set error
	Util::setError("A jelszó helytelen!\nKérjük, próbálja újra!");
}

// Unset not necessary key
unset($args['password_current']);

// Set query
$query 	= "UPDATE `users` 
							SET `password` = :password 
						WHERE `id` = :id";

// Execute query
$result = $db->execute($query, $args);

// Close connection
$db = null;

// Check not success
if (!$result['affectedRows']) {

	// Set error
	Util::setError('Az adatmódosítás nem sikerült!');
}

// Set response
Util::setResponse(null);